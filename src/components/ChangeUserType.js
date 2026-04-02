// components/ChangeUserType.js
import React, { useState } from 'react';
import './ChangeUserType.css'
const ChangeUserType = () => {
  const [users, setUsers] = useState([
    { id: 'S001', name: 'John Student', currentType: 'Student', newType: 'Student' },
    { id: 'F001', name: 'Dr. Smith', currentType: 'Faculty', newType: 'Faculty' },
    { id: 'S002', name: 'Alice Johnson', currentType: 'Student', newType: 'Student' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const userTypes = ['Student', 'Faculty', 'Librarian'];

  const handleTypeChange = (userId, newType) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, newType } : user
    ));
  };

  const handleSave = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user.currentType !== user.newType) {
      setUsers(users.map(u => 
        u.id === userId ? { ...u, currentType: u.newType } : u
      ));
      setMessage(`User ${user.name}'s type changed to ${user.newType}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Change User Types</h2>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border text-left">User ID</th>
            <th className="p-2 border text-left">Name</th>
            <th className="p-2 border text-left">Current Type</th>
            <th className="p-2 border text-left">New Type</th>
            <th className="p-2 border text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{user.currentType}</span>
              </td>
              <td className="p-2 border">
                <select
                  value={user.newType}
                  onChange={(e) => handleTypeChange(user.id, e.target.value)}
                  className="p-1 border rounded"
                >
                  {userTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </td>
              <td className="p-2 border">
                {user.currentType !== user.newType && (
                  <button
                    onClick={() => handleSave(user.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                )}
                {user.currentType === user.newType && (
                  <span className="text-gray-400">No change</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChangeUserType;