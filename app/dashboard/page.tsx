import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React from 'react';
import styles from '../ui/dashboard/dashboard.module.css';
import Card from '../ui/dashboard/card/card';
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import Table from '../ui/dashboard/table/table';
import "../ui/globals.css";


export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.sbom}> 

        </div>
        <div className={styles.cards}>
          <Card/>
          <Card/>
          <Card/>  
        </div>
        <Table/>

      </div>
      <div className={styles.side}>
        <Rightbar/>
      </div>
    </div>
  )
}

