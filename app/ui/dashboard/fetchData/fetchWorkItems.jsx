// C:\Users\RobinKvalvågnes\testbudy\app\ui\dashboard\fetchData\fetchWorkItems.jsx

import { useEffect, useState } from 'react';
import Card from '../card/card'; // Adjust the path as necessary
import styles from './fetchWorkItems.module.css'; // Create and adjust this CSS file if needed

const FetchWorkItems = () => {
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/azure'); // Ensure this matches your API route
        const data = await response.json();
        setItemCount(data.workItems.length); // Get the length of work items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching work items:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Pass the item count to the Card component */}
      <Card itemCount={itemCount} />
    </div>
  );
};

export default FetchWorkItems;
