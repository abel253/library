// components/RenewItems.js
import React, { useState } from 'react';
import './RenewItems.css';

const RenewItems = ({ user }) => {
  const [checkedOutItems, setCheckedOutItems] = useState([
    { id: 1, title: 'Software Engineering', dueDate: '2024-04-15', status: 'Can Renew' },
    { id: 2, title: 'Introduction to Algorithms', dueDate: '2024-04-20', status: 'Can Renew' },
  ]);
  const [message, setMessage] = useState('');

  const handleRenew = (itemId) => {
    setCheckedOutItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'Renewed', dueDate: '2024-05-15' }
          : item
      )
    );
    setMessage('Item renewed successfully! New due date is 2024-05-15');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Renew Checked Out Items</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      {checkedOutItems.length === 0 ? (
        <p className="text-gray-500">You have no items checked out.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border text-left">Item Title</th>
              <th className="p-2 border text-left">Current Due Date</th>
              <th className="p-2 border text-left">Status</th>
              <th className="p-2 border text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {checkedOutItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.dueDate}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.status === 'Renewed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-2 border">
                  {item.status === 'Can Renew' && (
                    <button
                      onClick={() => handleRenew(item.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Renew
                    </button>
                  )}
                  {item.status === 'Renewed' && <span className="text-green-600">Renewed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="mt-4 text-sm text-gray-500">Note: Items can be renewed if not reserved by another user.</p>
    </div>
  );
};

export default RenewItems;