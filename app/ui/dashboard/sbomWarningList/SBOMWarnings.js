"use client"; // Make sure this component is treated as a client component

import React, { useState } from 'react';
import styles from './SBOMWarnings.module.css'; 

const filterData = (data, filter) => {
  const now = new Date();
  return data.filter((item) => {
    const itemDate = new Date(item.created_at);
    switch (filter) {
      case 'day':
        return itemDate.toDateString() === now.toDateString();
      case 'week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      case 'month':
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      default:
        return true; // Show all if no filter is applied
    }
  });
};

const SBOMWarnings = ({ sbomData }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Filter and sort the data
  const filteredData = filterData(sbomData, filter);
  const sortedData = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const displayedData = showAll ? sortedData : sortedData.slice(0, 5);

  const handleExtend = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('day')}>Today</button>
        <button onClick={() => setFilter('week')}>This Week</button>
        <button onClick={() => setFilter('month')}>This Month</button>
      </div>
      <div>
        Total 
      </div>
      <div className={styles.divider}>
        <hr />
      </div>
      <div className={styles.sbom}>
        <h2>SBOM Warnings:</h2>
        <ul className={styles.sbomList}>
          {displayedData.length === 0 ? (
            <div>No SBOM warnings found for the selected filter.</div>  //if there is no smboms in the time frame selected
          ) : (
            displayedData.map((item) => (
              <li key={item.id}>
                <div>{JSON.stringify(item.raw)} </div>
                <div className={styles.sbomListTime}>{new Date(item.created_at).toLocaleString()} -- Responsible:{item.email}</div>
              </li>
            ))
          )}
        </ul>
        {sortedData.length > 5 && !showAll && (
          <button className={styles.extendButton} onClick={handleExtend}>Show All</button>
        )}
        {showAll && (
          <button className={styles.extendButton} onClick={handleShowLess}>Show Less</button>
        )}
      </div>
    </div>
  );
};

export default SBOMWarnings;
