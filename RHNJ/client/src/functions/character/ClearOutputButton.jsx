import React, { useEffect } from 'react';

const ClearOutputButton = ({ setOutput }) => {
    const handleClear = () => setOutput("");
  
    return <button onClick={handleClear}>Clear Output</button>;
  };
  
  export default ClearOutputButton;
  