'use client'
import React, { useEffect, useState } from 'react';
import { getTestRuns, insertFakeTestRun } from '../../../lib/getlistsupabase';
import { TestRun } from '../../../lib/types';

const Page = () => {
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);

  useEffect(() => {
    const fetchTestRuns = async () => {
      try {
        const data = await getTestRuns();
        setTestRuns(data);
      } catch (error) {
        console.error('Error fetching test runs:', error);
      }
    };

    fetchTestRuns();
  }, []);

  const handleInsert = async () => {
    try {
      await insertFakeTestRun();
      alert('Fake test run inserted successfully!');
    } catch (error) {
      console.error('Error inserting fake test run:', error);
    }
  };

  return (
    <div>
      <h1>Test Runs</h1>
      <ul>
        {testRuns.map((run) => (
          <li key={run.id}>
            {run.testName} - {run.state} - {run.testID}
          </li>
        ))}
      </ul>
      <button onClick={handleInsert}>Insert Fake Test Run</button>
    </div>
  );
};

export default Page;
