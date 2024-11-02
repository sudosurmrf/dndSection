import React, { useState } from 'react';
import { rollOnce, rollOnceEach, rollFull, calculateDamage } from './rollFunctions';

const Roller = () => {
  const [output, setOutput] = useState([]);
  const [totalDamage, setTotalDamage] = useState(0);

  const handleRollOnce = (atkID) => {
    const result = rollOnce(atkID);
    updateOutput(result);
  };

  const handleRollOnceEach = (atkID) => {
    const result = rollOnceEach(atkID);
    updateOutput(result);
  };

  const handleRollFull = (atkID) => {
    const result = rollFull(atkID);
    updateOutput(result);
  };

  const updateOutput = (newOutput) => {
    const total = newOutput.reduce((sum, roll) => sum + roll.dmg, 0);
    setOutput([newOutput, ...output]);
    setTotalDamage(totalDamage + total);
  };

  return (
    <div>
      <button onClick={() => handleRollOnce('attack1')}>Roll Once</button>
      <button onClick={() => handleRollOnceEach('attack1')}>Roll Each</button>
      <button onClick={() => handleRollFull('attack1')}>Roll Full</button>

      <div id="output">
        <h3>Roll Results</h3>
        {output.map((result, idx) => (
          <p key={idx}>
            {result.output} : {result.dmg} dmg
          </p>
        ))}
      </div>

      <div id="outTotal">
        <h4>Total - {totalDamage}</h4>
      </div>
    </div>
  );
};

export default Roller;