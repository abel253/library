// components/ConfigureDueDate.js
import React, { useState } from 'react';
import './configureduedate.css'
const ConfigureDueDate = () => {
  const [itemTypes, setItemTypes] = useState([
    { type: 'Books', dueDays: 14, defaultDays: 14 },
    { type: 'Journals', dueDays: 7, defaultDays: 7 },
    { type: 'Magazines', dueDays: 5, defaultDays: 5 },
    { type: 'DVDs', dueDays: 3, defaultDays: 3 },
  ]);
  const [message, setMessage] = useState('');

  const handleDueDateChange = (typeIndex, newDays) => {
    const updated = [...itemTypes];
    updated[typeIndex].dueDays = parseInt(newDays) || 0;
    setItemTypes(updated);
  };

  const handleSave = () => {
    setMessage('Due date configuration saved successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReset = (typeIndex) => {
    const updated = [...itemTypes];
    updated[typeIndex].dueDays = updated[typeIndex].defaultDays;
    setItemTypes(updated);
    setMessage(`${updated[typeIndex].type} reset to default (${updated[typeIndex].defaultDays} days)`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Configure Due Dates for Items</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      <p className="text-gray-600 mb-4">Configure how many days users can check out different types of items.</p>
      
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border text-left">Item Type</th>
            <th className="p-2 border text-left">Due Days</th>
            <th className="p-2 border text-left">Default</th>
            <th className="p-2 border text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {itemTypes.map((item, idx) => (
            <tr key={item.type} className="hover:bg-gray-50">
              <td className="p-2 border font-medium">{item.type}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.dueDays}
                  onChange={(e) => handleDueDateChange(idx, e.target.value)}
                  className="w-24 p-1 border rounded"
                  min="1"
                />
                <span className="ml-2 text-gray-500">days</span>
              </td>
              <td className="p-2 border">{item.defaultDays} days</td>
              <td className="p-2 border">
                {item.dueDays !== item.defaultDays && (
                  <button
                    onClick={() => handleReset(idx)}
                    className="text-blue-600 hover:underline"
                  >
                    Reset to Default
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save All Changes
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Changes will apply to all new checkouts. Existing checkouts will keep their original due dates.
        </p>
      </div>
    </div>
  );
};

export default ConfigureDueDate;