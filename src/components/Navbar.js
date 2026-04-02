// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold">Library Circulation System</Link>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name}</span>
          <span className="px-2 py-1 bg-blue-600 rounded text-sm">{user?.userType}</span>
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;