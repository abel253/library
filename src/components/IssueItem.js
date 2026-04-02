// components/IssueItem.js
import React, { useState } from 'react';
import './IssueItem.css'
const IssueItem = () => {
  const [userId, setUserId] = useState('');
  const [itemId, setItemId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [issued, setIssued] = useState(false);

  const mockUsers = {
    'S001': { id: 'S001', name: 'John Student', userType: 'Student', status: 'ABLE_TO_BORROW', itemsIssued: 2, maxItems: 5 },
    'F001': { id: 'F001', name: 'Dr. Smith', userType: 'Faculty', status: 'ABLE_TO_BORROW', itemsIssued: 1, maxItems: 10 },
  };

  const mockItems = {
    'B001': { id: 'B001', title: 'Software Engineering', status: 'Available', callNumber: 'QA76.758 .P74' },
    'B002': { id: 'B002', title: 'Clean Code', status: 'Available', callNumber: 'QA76.76 .M37' },
    'B003': { id: 'B003', title: 'Design Patterns', status: 'Checked Out', callNumber: 'QA76.64 .G36' },
  };

  const handleSearchUser = () => {
    const user = mockUsers[userId];
    if (!user) {
      setMessage('User not found');
      setUserInfo(null);
    } else if (user.status !== 'ABLE_TO_BORROW') {
      setMessage('User is not eligible to borrow items');
      setUserInfo(null);
    } else if (user.itemsIssued >= user.maxItems) {
      setMessage(`User has reached maximum borrowing limit (${user.maxItems} items)`);
      setUserInfo(null);
    } else {
      setUserInfo(user);
      setMessage('');
    }
  };

  const handleSearchItem = () => {
    const item = mockItems[itemId];
    if (!item) {
      setMessage('Item not found');
      setItemInfo(null);
    } else if (item.status !== 'Available') {
      setMessage(`Item is ${item.status}. Not available for issue.`);
      setItemInfo(null);
    } else {
      setItemInfo(item);
      setMessage('');
    }
  };

  const handleIssue = () => {
    if (userInfo && itemInfo) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      setMessage(`Successfully issued "${itemInfo.title}" to ${userInfo.name}. Due date: ${dueDate.toLocaleDateString()}`);
      setIssued(true);
      setUserInfo(null);
      setItemInfo(null);
      setUserId('');
      setItemId('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Issue Item to User</h2>
      {message && (
        <div className={`p-2 rounded mb-4 ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">User Information</h3>
          <div className="mb-3">
            <label className="block text-sm mb-1">User ID / Username</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                className="flex-1 p-2 border rounded"
                disabled={issued}
              />
              <button
                onClick={handleSearchUser}
                className="bg-gray-600 text-white px-4 rounded hover:bg-gray-700"
                disabled={issued}
              >
                Search
              </button>
            </div>
          </div>
          {userInfo && (
            <div className="mt-3 p-2 bg-gray-50 rounded">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Type:</strong> {userInfo.userType}</p>
              <p><strong>Status:</strong> {userInfo.status}</p>
              <p><strong>Items Issued:</strong> {userInfo.itemsIssued} / {userInfo.maxItems}</p>
            </div>
          )}
        </div>

        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">Item Information</h3>
          <div className="mb-3">
            <label className="block text-sm mb-1">Item ID / Call Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter Item ID"
                className="flex-1 p-2 border rounded"
                disabled={issued}
              />
              <button
                onClick={handleSearchItem}
                className="bg-gray-600 text-white px-4 rounded hover:bg-gray-700"
                disabled={issued}
              >
                Search
              </button>
            </div>
          </div>
          {itemInfo && (
            <div className="mt-3 p-2 bg-gray-50 rounded">
              <p><strong>Title:</strong> {itemInfo.title}</p>
              <p><strong>Call Number:</strong> {itemInfo.callNumber}</p>
              <p><strong>Status:</strong> {itemInfo.status}</p>
            </div>
          )}
        </div>
      </div>

      {userInfo && itemInfo && !issued && (
        <div className="mt-6">
          <button
            onClick={handleIssue}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Issue Item
          </button>
        </div>
      )}

      {issued && (
        <div className="mt-6">
          <button
            onClick={() => {
              setIssued(false);
              setMessage('');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Issue Another Item
          </button>
        </div>
      )}
    </div>
  );
};

export default IssueItem;