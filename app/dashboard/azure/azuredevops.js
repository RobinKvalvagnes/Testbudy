import axios from 'axios';

const org = process.env.NEXT_PUBLIC_AZURE_DEVOPS_ORG;
const project = process.env.NEXT_PUBLIC_AZURE_DEVOPS_PROJECT;
const token = process.env.NEXT_PUBLIC_AZURE_DEVOPS_TOKEN;

const axiosInstance = axios.create({
  baseURL: `https://dev.azure.com/${org}/${project}/_apis/test/runs`,
  headers: {
    Authorization: `Basic ${Buffer.from(`:${token}`).toString('base64')}`,
  },
});

export async function fetchTestRuns() {
  try {
    const response = await axiosInstance.get('?api-version=6.0');
    return response.data.value; // Assuming 'value' contains the array of test runs
  } catch (error) {
    console.error('Error fetching test runs:', error.message);
    throw error;
  }
}
//test