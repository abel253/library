// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home'; 
import Login from './components/login'; // 'l' ትንሽ መሆኗን ያረጋግጡ
import SignUp from './components/SignUp';
import PublicSearch from './components/public-search'; // እዚህ ጋር የነበረውን Space አጥፍቻለሁ
import About from './components/About';
import Service from './components/Service';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);

  return (
    <Router>
      {/* Navbar በሁሉም ገጽ ላይ ቋሚ (Static) ሆኖ እንዲታይ እዚህ ይቀመጣል */}
      <Navbar /> 
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* ሊንኩን /public-search አድርገነዋል */}
          <Route path="/public-search" element={<PublicSearch />} /> 
          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* ሌላ ያልታወቀ አድራሻ ሲመጣ ወደ Home ይመልሰዋል */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}

export default App;