'use client'
import {createClient} from "@supabase/supabase-js";
import {useEffect, useState} from 'react';
import Header from "../../../components/Header"
import PatientDropdown from "@/components/PatientDropdown";
import PatientReport from "@/components/PatientReport";

const Dashboard = () => {

    const tempClinician = "586c12b3-246c-421a-94c2-e907fd50ef34";

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL||"", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"");
    const [children, setChildren] = useState<any[]>([]);
    const [selectedChildID, setSelectedChildID] = useState<any>("");
    const [childReports, setChildReports] = useState<any[]>([]);
  
    const updateSelectedChild = (childId:any) => {
      setSelectedChildID(childId);
    }

    useEffect(() => {
      getChildren();
    },[]);

    useEffect(() => {
      getReport();
    },[selectedChildID])
  
  
    async function getChildren() {
      const{data:associatedChildren, error} = await supabase.from('children').select().eq('clinician',tempClinician);
      setChildren(associatedChildren||[]);
    }

    async function getReport() {
      const{data:reportData, error} = await supabase.from('reports').select().eq('child',selectedChildID);
      console.log(reportData)
      setChildReports(reportData||[]);
    }

    const test = [{name:"child1",id:1},{name:"child2",id:2},{name:"child3",id:3},]
  

    return (
        <>
            <Header/>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-md">
              <div className="flex flex-row flex-wrap items-center justify-left gap-5 w-screen px-10 py-2.5">
                <h2>View Patient Reports:</h2>
                <PatientDropdown updateSelectedChild={updateSelectedChild} patients={children}/>
              </div>
              <PatientReport reports={childReports}/>
            </div>

            <h1>{selectedChildID}</h1>
        </>
    )
}

export default Dashboard