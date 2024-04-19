'use client'
import React, { useState } from 'react';
import { createClient } from "@/utils/supabase/client";

// Define the interface for the form data
interface FormData {
  email: string;
}

const ClinicianForm: React.FC = () => {

  const supabase = createClient();

  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const [formError, setFormError] = useState<string>("")
  const [formSuccess, setFormSuccess] = useState<string>("")

  // Event handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getUUIDFromEmail = async (email: string) => {
    const{data: users, error} = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (error) {
        // console.error('Error fetching user data:', error.message);
        setFormError("User not found as registered")
        return null;
    }
    
    if (!users) {
        setFormError("User not found as registered")
        return null;
    }

    return users.id
  }

  const insertClinicianFromUUID = async (UUID: string) => {
    const { data: existingClinicians, error: selectError } = await supabase
      .from('clinicians')
      .select('id')
      .eq('user', UUID);

      if (selectError) {
        // console.error('Error checking existing clinicians:', selectError.message);
        setFormError("Error fetching clinicians")
        return;
      }

        // If the UUID doesn't exist in the clinicians table, insert it
    if (!existingClinicians || existingClinicians.length === 0) {
      const { data: insertedClinician, error: insertError } = await supabase
        .from('clinicians')
        .insert([{ user:UUID }]);

      if (insertError) {
        // console.error('Error inserting clinician:', insertError.message);
        setFormError("Error Inserting Clinician")
        return false;
      }

      //console.log('Clinician inserted successfully:', insertedClinician);
      return true;
    } else {
      // console.log('Clinician with UUID already exists:', existingClinicians[0]);
      setFormError("User already registered as Clinician")
      return false;
    }
  }

  // Event handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess("")
    // get UUID from the authenticated data in our Supabase db
    const userUUID = await getUUIDFromEmail(formData['email'])
    // then using UUID, create the instance into our clinciian table
    //console.log(userUUID)
    if (userUUID === null){
      console.log("Error finding user!")
      return 
    }
    if (await insertClinicianFromUUID(userUUID)===true){
      setFormData({email:''})
      setFormError("")
      setFormSuccess("Successfully registered user as clinician!")
    }
    else{
      console.log("Error in creating user")
    }
  };

  return (
    <form className="grid grid-cols-2 grid-rows-2 gap-5 bg-gray-300 dark:bg-slate-600 p-10 rounded-md mt-40" onSubmit={handleSubmit}>
      <h1 className="text-black dark:text-white text-xl text-center col-span-2">Assign User as Clinician</h1>
      <label className="text-black dark:text-white col-span-2">
        Clinician Email: 
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="text-black dark:text-white px-3 py-2 ml-2 rounded-lg"
        />
      </label>
      <div className="col-span-2 text-center">
        {/* warning label */}
        <h2 className="inline text-red-500">{formError}</h2>
        {/* success label */}
        <h2 className="inline text-green-500">{formSuccess}</h2>
      </div>
      <button type="submit" className="col-span-2 bg-blue-700 px-3 py-1 text-white dark:text-white rounded-lg hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default ClinicianForm;