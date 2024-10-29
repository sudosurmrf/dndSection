import React, { useEffect } from 'react';

const ImportButton = ({ setData }) => {
    const handleImport = () => {
      const inputField = document.getElementById("inOutField").value;
      try {
        const newData = JSON.parse(inputField);
        setData(newData); // Replace current data with imported data
      } catch (err) {
        console.error("Invalid JSON format", err);
      }
    };
  
    return <button onClick={handleImport}>Import Data</button>;
  };
  
  export default ImportButton;