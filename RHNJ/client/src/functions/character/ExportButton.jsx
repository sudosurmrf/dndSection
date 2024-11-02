import React, { useEffect } from 'react';

const ExportButton = ({ data }) => {
    const handleExport = () => {
      const exportField = document.getElementById("inOutField");
      exportField.value = JSON.stringify(data, null, 2);
    };
  
    return <button onClick={handleExport}>Export Data</button>;
  };
  
  export default ExportButton;