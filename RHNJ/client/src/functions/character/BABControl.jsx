import React from 'react';

const BABControl = ({ bab, setData }) => {
  const handleBABChange = (field, value) => {
    setData((prevData) => {
      const newBAB = field === 'babBase' ? parseInt(value) : prevData.bab;
      const newTemp = field === 'babTemp' ? parseInt(value) : prevData.ab;
      const ab = newBAB + newTemp;

      return {
        ...prevData,
        bab: newBAB,
        ab
      };
    });
  };

  return (
    <div>
      <h2>Base Attack Bonus</h2>
      <label>
        BAB:
        <input
          type="number"
          value={bab}
          onChange={(e) => handleBABChange('babBase', e.target.value)}
        />
      </label>
      <span>Attack Bonus: {bab >= 0 ? `+${bab}` : bab}</span>
    </div>
  );
};

export default BABControl;