'use client'
import { createClient } from "@/utils/supabase/client";
import Header from "@/app/dashboard/components/Header"
import ClinicianForm from "./components/ClinicianForm";

const Add_Clinician = () => {

    const supabase = createClient();

    return (
        <>
            <Header/>
            <ClinicianForm/>
            
        </>
    )
}


export default Add_Clinician;