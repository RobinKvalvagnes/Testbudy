import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Button } from '@mui/material';
import styles from './table.module.css'; // Ensure the path is correct

const WorkItemsTable = ({ workItems }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine how many rows to show
  const displayedItems = showAll ? workItems : workItems.slice(0, 5);

  return (
    <div className={styles.container}>
      <h1 variant="h5" className={styles.headline}>
        All items in Test across projects ({workItems.length})
      </h1>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow className={styles.header}>
              <TableCell className={styles.headerCell}>ID</TableCell>
              <TableCell className={styles.headerCell}>Work Item Type</TableCell>
              <TableCell className={styles.headerCell}>Title</TableCell>
              <TableCell className={styles.headerCell}>Assigned To</TableCell>
              <TableCell className={styles.headerCell}>State</TableCell>
              <TableCell className={styles.headerCell}>Tags</TableCell>
              <TableCell className={styles.headerCell}>Area Path</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedItems.map((item) => (
              <TableRow key={item.id} className={styles.testCaseRow}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {item.title}
                  </Typography>
                </TableCell>
                <TableCell>{item.assignedTo}</TableCell>
                <TableCell>
                  <Chip label={item.state} color="warning" size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={item.tags} color="primary" size="small" />
                </TableCell>
                <TableCell>{item.areaPath}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {workItems.length > 5 && (
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="contained"
            className={styles.exstendButton}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkItemsTable;
