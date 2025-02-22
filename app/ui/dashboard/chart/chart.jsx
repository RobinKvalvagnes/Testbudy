"use client"
import styles from './chart.module.css'
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const data = [
    {
      name: 'Date A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Date B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Date C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Date D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Date E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Date F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Date G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart