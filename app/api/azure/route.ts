import { NextResponse } from 'next/server';
import axios from 'axios';
import { supabase } from '../../../utils/supabase/client';

// Extract Azure DevOps credentials from environment variables
const org = process.env.NEXT_PUBLIC_AZURE_DEVOPS_ORG;
const project = process.env.NEXT_PUBLIC_AZURE_DEVOPS_PROJECT;
const token = process.env.NEXT_PUBLIC_AZURE_DEVOPS_TOKEN;

// Create an instance of Axios with the Azure DevOps base URL and authentication
const axiosInstance = axios.create({
  baseURL: `https://dev.azure.com/${org}/${project}/_apis`,
  headers: {
    Authorization: `Basic ${Buffer.from(`:${token}`).toString('base64')}`,
  },
});

// Function to handle fetching and processing data
export async function GET() {
  try {
    // Fetch test runs from Azure DevOps
    const testRunsResponse = await axiosInstance.get('/test/runs?api-version=6.0');
    const workItemsQueryResponse = await axiosInstance.get(
      '/wit/wiql/38fed235-d8eb-40aa-95ad-df4b399ec28a?api-version=6.0'
    );

    // Map the test runs data as required
    const inputTestRuns = testRunsResponse.data.value.map((run: any) => ({
      testID: run.id,
      applicationName: run.name,
      state: run.state,
    }));

    // Fetch detailed work items using their IDs
    const workItemsUrls = workItemsQueryResponse.data.workItems.map((item: any) => item.url);
    const workItemsPromises = workItemsUrls.map((url: string) => axiosInstance.get(url));
    const workItemsResponses = await Promise.all(workItemsPromises);

    // Map the work items data as required
    const workItems = workItemsResponses.map((response: any) => ({
      id: response.data.id,
      type: response.data.fields['System.WorkItemType'],
      title: response.data.fields['System.Title'],
      assignedTo: response.data.fields['System.AssignedTo']?.displayName || 'Unassigned',
      state: response.data.fields['System.State'],
      tags: response.data.fields['System.Tags'],
      areaPath: response.data.fields['System.AreaPath'],
    }));

    // Insert the mapped test runs data into Supabase
    const { data: insertedData, error } = await supabase
      .from('testruns') // Ensure this is the correct table name
      .insert(inputTestRuns)  // Insert the mapped fields into Supabase
      .select(); // Optionally, retrieve the inserted data

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    // Return the test runs and work items as JSON
    return NextResponse.json({ testRuns: insertedData, workItems });
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json({ error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
  }
}
