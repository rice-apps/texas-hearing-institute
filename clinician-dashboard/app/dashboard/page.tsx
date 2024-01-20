'use client'
import {createClient} from "@supabase/supabase-js";
import {useEffect, useState} from 'react';
import Header from "../../components/Header"

const Dashboard = () => {

    const tempClinician = "586c12b3-246c-421a-94c2-e907fd50ef34";

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL||"", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"");
    const [children, setChildren] = useState<any[]>([]);
  
    useEffect(() => {
      getChildren();
      // insChilren();
    },[]);
  
    // async function insChilren(){
    //   const { data, error } = await supabase
    //   .from('children')
    //   .insert([
    //     { 'id': '715e03be-64c7-4031-b293-66cc5ef2386f', 'name': 'test 2', 'clinician': '586c12b3-246c-421a-94c2-e907fd50ef34'},
    //   ])
    //   .select()    
    // }
  
    async function getChildren() {
      const{data:associatedChildren, error} = await supabase.from('children').select().eq('clinician',tempClinician);
      setChildren(associatedChildren||[]);
    }

  

    return (
        <>
            <Header/>
            <ul>
                {children.map(e => <li key={e.id}>{e.name}</li>)}
            </ul>
        </>
    )
}

export default Dashboard