'use client'; // This line marks the file as a client component

import React, { useEffect, useState } from 'react';
import { fetchTestRuns } from './azureDevOps';


interface TestRun {
  id: number;
  name: string;
  state: string;
  count: number;
  // Add other properties as needed
}

const AzureTestPlan = () => {
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const runs = await fetchTestRuns();
        setTestRuns(runs);
        setLoading(false);
      } catch (err: Error | any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  

  return (
    <div>
      <div>
      <h1>testRuns</h1>
      </div>
      {testRuns.length > 0 ? (
        
        <ul>
          {testRuns.map(run => (
            <li key={run.id}>
              <strong>{run.name}</strong> - {run.state} {/* Displaying name and state */} 
            </li>
          ))}
        </ul>
      ) : (
        <div>No test runs found.</div>
      )}
    </div>
  );
};

export default AzureTestPlan;
