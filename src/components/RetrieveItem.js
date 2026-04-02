// components/RetrieveItem.js
import React, { useState } from 'react';
import './ReturnItem.css';

const RetrieveItem = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');

  const mockUserWithItems = {
    'S001': {
      id: 'S001',
      name: 'John Student',
      items: [
        { id: 'B001', title: 'Software Engineering', issueDate: '2024-04-01', dueDate: '2024-04-15' }
      ]
    },
    'F001': {
      id: 'F001',
      name: 'Dr. Smith',
      items: [
        { id: 'B002', title: 'Clean Code', issueDate: '2024-04-05', dueDate: '2024-04-20' }
      ]
    }
  };

  const handleSearchUser = () => {
    const found = mockUserWithItems[userId];
    if (found) {
      setUser(found);
      setSelectedItem(null);
      setMessage('');
    } else {
      setMessage('User not found or has no items checked out');
      setUser(null);
    }
  };

  const handleRetrieve = () => {
    if (selectedItem) {
      setMessage(`Successfully returned "${selectedItem.title}" from ${user.name}`);
      setUser(null);
      setSelectedItem(null);
      setUserId('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Retrieve/Return Item</h2>
      {message && (
        <div className={`p-2 rounded mb-4 ${message.includes('Successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm mb-1">User ID</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearchUser}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {user && (
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">User: {user.name} ({user.id})</h3>
          <h4 className="font-medium mb-2">Checked Out Items:</h4>
          {user.items.length === 0 ? (
            <p className="text-gray-500">No items checked out.</p>
          ) : (
            <div className="space-y-2">
              {user.items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Due: {item.dueDate}</p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className={`px-3 py-1 rounded ${selectedItem?.id === item.id ? 'bg-green-600' : 'bg-yellow-600'} text-white hover:bg-yellow-700`}
                  >
                    {selectedItem?.id === item.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {selectedItem && (
            <div className="mt-4">
              <button
                onClick={handleRetrieve}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Return Selected Item
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RetrieveItem;