import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. የፋይል ስሞቹን በትክክል መጥራት (login 'l' ትንሽ መሆኗን አረጋግጥ)
import Login from './components/login'; 
import SignUp from './components/SignUp';
import PublicSearch from './components/PublicSearch';
import ProtectedRoute from './components/ProtectedRoute';

// 2. ዳሽቦርዶችን በትክክለኛው ስም መጥራት
import AdminDashboard from './dashboards/AdminDashboard';
import FacultyDashboard from './dashboards/FacultyDashboard';
import LibrarianDashboard from './dashboards/LibrarianDashboard';
import StudentDashboard from './dashboards/StudentDashboard'; // Rename ካደረግከው በኋላ

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicSearch />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboards" element={
          <ProtectedRoute user={user}>
            {user?.userType === 'Student' && <StudentDashboard user={user} onLogout={handleLogout} />}
            {user?.userType === 'Faculty' && <FacultyDashboard user={user} onLogout={handleLogout} />}
            {user?.userType === 'Librarian' && <LibrarianDashboard user={user} onLogout={handleLogout} />}
            {user?.userType === 'Administrator' && <AdminDashboard user={user} onLogout={handleLogout} />}
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
