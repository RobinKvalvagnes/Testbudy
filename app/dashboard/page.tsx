// app/dashboard/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SBOMWarnings from '../ui/dashboard/sbomWarningList/SBOMWarnings'; // Import the new component
import styles from '../ui/dashboard/dashboard.module.css';
import Card from '../ui/dashboard/card/card';
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import "../ui/globals.css";


export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); // Server-side redirect
  }

  const { data: sbomData, error } = await supabase.from('sbom').select('*');

  if (error) {
    console.error('Error fetching SBOM data:', error);
    return <div>Error fetching SBOM data</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <SBOMWarnings sbomData={sbomData} /> {/* Use the SBOMWarnings component here */}
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
}
