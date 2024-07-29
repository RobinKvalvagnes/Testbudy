
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import React from 'react';

export default async function Blazemeter() {
    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }
  
    return (
      <div> 
        Blazemeter
      </div>
    )
  }
  