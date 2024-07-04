
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from 'react';

//import { fetchAzureTestRuns } from '../../lib/azureDevOps';


export default async function AzureTestPlan() {
    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }
  
    return (
      <div> 
        AzureTestPlan
      </div>
    )
  }
  