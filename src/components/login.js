// components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './log.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    const mockUsers = [
      { username: 'student1', password: 'pass', userType: 'Student', name: 'John Student', id: 'S001' },
      { username: 'faculty1', password: 'pass', userType: 'Faculty', name: 'Dr. Smith', id: 'F001' },
      { username: 'librarian1', password: 'pass', userType: 'Librarian', name: 'Jane Librarian', id: 'L001' },
      { username: 'admin1', password: 'pass', userType: 'Administrator', name: 'Admin User', id: 'A001' },
    ];

    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Library Circulation System</h2>
        <h3 className="text-xl mb-4 text-center">Sign In</h3>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;