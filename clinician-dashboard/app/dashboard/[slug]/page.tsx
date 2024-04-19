'use client'
import {useEffect, useState} from 'react';
import Header from "@/app/dashboard/components/Header"
import PatientDropdown from "@/app/dashboard/components/PatientDropdown";
import PatientReport from "@/app/dashboard/components/PatientReport";
import { createClient } from "@/utils/supabase/client";

const Dashboard = () => {

    const supabase = createClient();

    const [clinician, setClinician] = useState<any>();
    const [children, setChildren] = useState<any[]>([]);
    const [selectedChildID, setSelectedChildID] = useState<any>();
    const [childReports, setChildReports] = useState<any[]>([]);
  
    const updateSelectedChild = (childId:any) => {
      setSelectedChildID(childId);
    }


    useEffect(() => {

      const fetchUserData = async () => {
        try {
          const { data, error} = await supabase.auth.getUser();
          if (error) {
            throw error;
          }
          const userId = data['user']['id'];
          // currently using dummy clinician UID because the give user can be any auth user
          // replace the uuid passed into 2nd param of eq with userID to check logged in Users
          // const userId = '0b04fa32-c264-4102-86d3-511fb18f8ecb';
          const{data:clinicianUID, error:error2} = await supabase.from('clinicians').select('id').eq('user',userId);
          if(error2){
            throw error2;
          }
          if(clinicianUID.length==0){
            throw new Error("user not found as clinician")
          }
          const currClinician = clinicianUID[0]['id']
          setClinician(currClinician);

          // retrieve associated children right after getting currently logged in clinician
          const{data:associatedChildren, error:error3} = await supabase.from('children').select().eq('clinician',currClinician);
          if (error3){
            throw error3
          }
          setChildren(associatedChildren||[])
          
        } catch (error:any) {
            console.error('Error fetching user data:', error.message);
        }
      };
  
      fetchUserData();
    }, []); 
  

    useEffect(() => {
      const getReport = async () => {
        try{
          const{data:reportData, error} = await supabase.from('reports').select().eq('child',selectedChildID);
          if(error) {
            throw error
          }
          setChildReports(reportData||[]);
        }
        catch(error){
          console.error('Error fetching user data:', error);
        }
      };
      if (selectedChildID)
        getReport();
    },[selectedChildID])
 
  

    return (
        <div>
            <Header/>
            <br />
            <div className="flex justify-center content-center items-center ">
              
              <div className="bg-white dark:bg-gray-800 rounded-md w-11/12 border-gray-300 dark:border-black border">
                
                <div className="flex flex-row flex-wrap items-center justify-left gap-5 w-screen px-5 py-2.5">
                  <h2 className="text-black dark:text-white">Search Patients:</h2>
                  <PatientDropdown updateSelectedChild={updateSelectedChild} patients={children}/>
                </div>
                <div className="">
                  <PatientReport reports={childReports}/>
                </div>
              </div>
            </div>

        </div>
    )
}

export default Dashboard;