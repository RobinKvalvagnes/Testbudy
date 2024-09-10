import { supabase } from '../utils/supabase/client';
import { TestRun } from './types';

// Function to fetch test runs from the 'testruns' table
export async function getTestRuns(): Promise<TestRun[]> {
  const { data, error } = await supabase
    .from('testruns')
    .select('*');

  if (error) {
    console.error('Error fetching test runs:', error);
    throw error;
  }

  return data as TestRun[] || [];
}

// Function to insert fake data into the 'testruns' table
export async function insertFakeTestRun(): Promise<void> {
  const fakeData: TestRun = {
    id: Math.floor(Math.random() * 1000),  // exemple (number)
    state: 'passed',  // Example state
    applicationName: 'Test Application',  // Example application name
    testID: Math.floor(Math.random() * 10000),  // Example of a numeric field
    testName: 'Sample Test',  // Example test name
    testURL: 'https://example.com/test-url'  // Example test URL
  };

  const { data, error } = await supabase
    .from('testruns')
    .insert([fakeData])
    .select();

  if (error) {
    console.error('Error inserting fake test run:', error);
    throw error;
  }

  console.log('Inserted fake test run:', data);
}

