'use client'
import { createClient } from "@/utils/supabase/client";
import Header from "@/app/dashboard/components/Header"
import ClinicianForm from "./components/ClinicianForm";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';

const Add_Clinician = () => {

    const supabase = createClient();

    const [redirectBool, setRedirect] = useState(false);

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
            const{data:clinicianUID, error:error2} = await supabase.from('clinicians').select('id').eq('user',userId);
            if(error2){
              throw error2;
            }
            if(clinicianUID.length==0){
                setRedirect(true)
                throw new Error("user not found as clinician")
            }
          } catch (error:any) {
            console.error('Error fetching user data:', error.message);
          }
        }
        fetchUserData();
      }, [])

    if (redirectBool) {
        supabase.auth.signOut()
        redirect("/")
    }

    return (
        <>
            <Header/>
            <ClinicianForm/>
            
        </>
    )
}


export default Add_Clinician;