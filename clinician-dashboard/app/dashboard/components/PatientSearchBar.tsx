import React, { useState } from 'react';

interface SearchBarProps {
  data: string[]; // Example data array
}

const PatientSearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter the data based on the search term
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSearchBar;
