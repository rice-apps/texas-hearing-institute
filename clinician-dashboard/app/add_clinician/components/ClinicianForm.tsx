import React, { useState } from 'react';

// Define the interface for the form data
interface FormData {
  email: string;
}

const ClinicianForm: React.FC = () => {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  // Event handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the form data or make API requests
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Clinician Microsoft Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="text-white"
        />
      </label>

      <button type="submit" className="bg-green-600 px-3 py-1 text-white dark:text-white rounded-lg hover:bg-green-500">Submit</button>
    </form>
  );
};

export default ClinicianForm;