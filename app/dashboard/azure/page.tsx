'use client'; // This line marks the file as a client component

import React, { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import StatusCardCompleted from '../../ui/azure/statusCards/statusCardCompleted';
import StatusCardFailed from '../../ui/azure/statusCards/statusCardFailed';
import StatusCardInprogress from '../../ui/azure/statusCards/statusCardInprogress';
import WorkItemsTable from '../../ui/dashboard/table/table'; // Ensure this import is correct
import styles from '../../ui/azure/azure.module.css';
import { Button } from '@mui/material';

interface TestRun {
  id: number;
  applicationName: string;
  state: string;
  count: number;
  testID: number;
}

interface WorkItem {
  id: number;
  type: string;
  title: string;
  assignedTo: string;
  state: string;
  tags: string;
  areaPath: string;
}

const AzureTestPlan = () => {
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    completed: 0,
    investigating: 0,
    inProgress: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/azure');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON response');
      }

      const { testRuns: newTestRuns, workItems: newWorkItems } = data;

      setTestRuns(newTestRuns);
      setWorkItems(newWorkItems);

      const completedCount = getCountForStatus(newTestRuns, 'Completed');
      const investigatingCount = getCountForStatus(newTestRuns, 'NeedsInvestigation');
      const inProgressCount = getCountForStatus(newTestRuns, 'InProgress');

      setCounts({
        completed: completedCount,
        investigating: investigatingCount,
        inProgress: inProgressCount,
      });

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCountForStatus = (newTestRuns: TestRun[], statusName: string) => {
    return newTestRuns.filter(run => run.state === statusName).length;
  };

  const handleStartRun = () => {
    fetchData();
  };

  if (loading) return <Spinner size="lg" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div><WorkItemsTable workItems={workItems} /></div>
      <h1 style={{ marginTop: '20px' }}>Test Runs</h1>
      <div className={styles.cards}>
        <StatusCardCompleted count={counts.completed} />
        <StatusCardFailed count={counts.investigating} />
        <StatusCardInprogress count={counts.inProgress} />
      </div>
      <div>
        <h2 style={{ marginTop: '20px' }}>Status from tests in testplan: <Button variant="contained" color="primary" onClick={handleStartRun}>Refresh list tests</Button></h2>
      </div>
      {testRuns.length > 0 ? (
        <ul>
          {testRuns.map((run) => (
            <li key={run.testID}>
              <strong>{run.applicationName}</strong> - {run.state} (ID: {run.testID})
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
