// components/ConfigureFine.js
import React, { useState } from 'react';
import './ConfigureFine.css'
const ConfigureFine = () => {
  const [fineRate, setFineRate] = useState(1.00);
  const [maxFine, setMaxFine] = useState(50.00);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage(`Fine configuration saved: $${fineRate.toFixed(2)} per day, max fine $${maxFine.toFixed(2)}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Configure Fine for Overdue Items</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      <div className="max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Fine per Day (per item)</label>
          <div className="flex items-center">
            <span className="text-xl mr-2">$</span>
            <input
              type="number"
              step="0.25"
              value={fineRate}
              onChange={(e) => setFineRate(parseFloat(e.target.value) || 0)}
              className="w-32 p-2 border rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Current fine rate: ${fineRate.toFixed(2)} per day</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Maximum Fine per Item</label>
          <div className="flex items-center">
            <span className="text-xl mr-2">$</span>
            <input
              type="number"
              step="5.00"
              value={maxFine}
              onChange={(e) => setMaxFine(parseFloat(e.target.value) || 0)}
              className="w-32 p-2 border rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Maximum fine per item: ${maxFine.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded mb-6">
          <h3 className="font-semibold mb-2">Example Calculation:</h3>
          <p className="text-sm">If an item is 10 days overdue:</p>
          <p className="text-sm">Fine = 10 × ${fineRate.toFixed(2)} = ${(10 * fineRate).toFixed(2)}</p>
          <p className="text-sm">Capped at maximum fine: ${maxFine.toFixed(2)}</p>
        </div>
        
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Fine Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigureFine;