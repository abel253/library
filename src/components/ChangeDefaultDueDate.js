// components/ChangeDefaultDueDate.js
import React, { useState } from 'react';
import './ChangeDefaultDueDate.css';
const ChangeDefaultDueDate = () => {
  const [defaultDueDays, setDefaultDueDays] = useState(14);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage(`Default due date changed to ${defaultDueDays} days from issue date`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Change Default Due Date for Items</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      <div className="max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Default Due Period</label>
          <div className="flex items-center">
            <input
              type="number"
              value={defaultDueDays}
              onChange={(e) => setDefaultDueDays(parseInt(e.target.value) || 0)}
              className="w-32 p-2 border rounded"
              min="1"
              max="60"
            />
            <span className="ml-2">days</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Items will be due {defaultDueDays} days after checkout
          </p>
        </div>
        
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Default Due Date
        </button>
      </div>
    </div>
  );
};

export default ChangeDefaultDueDate;