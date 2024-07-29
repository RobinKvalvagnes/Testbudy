const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { fetchTestRuns } = require('./azuredevops'); // Adjust the path as needed

// Create a new instance of axios-mock-adapter
const mock = new MockAdapter(axios);

// Mock environment variables (replace with actual values or use dotenv if needed)
const org = 'metaforce';
const project = 'Metaforce%20Ticket%20Solution';
 // Tror det er denne den klaget på

// Mock the Axios request for testing fetchTestRuns function
mock.onGet(`https://dev.azure.com/${org}/${project}/_apis/test/runs?api-version=6.0`).reply(200, {
  value: [
    { id: 1, name: 'Test Run 1' },
    { id: 2, name: 'Test Run 2' },
    // Add more test data as needed
  ]
});

// Define a function to run the test
async function runTest() {
  try {
    // Call fetchTestRuns function
    const { data } = await fetchTestRuns();
    console.log('Test Runs:', data);
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Execute the test
runTest();
