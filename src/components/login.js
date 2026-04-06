// components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './log.css';
import mekdela from "../assets/mau.jpg";
// 1. ምስሉን እዚህ ጋር Import አድርገው
import bgImage from "../assets/library11.jpg"; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost/library/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.user);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed. Please check your server.');
    }
  };

  return (
    // 2. እዚህ ጋር Inline Style በመጠቀም ምስሉን እና ቀለሙን እናዋህዳለን
    <div className="login-container" style={{ 
        backgroundImage: ` url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    }}>
      <div className="login-card">
        <div className="login-header">
          <img src={mekdela} alt="MAU Logo" className="login-logo-img" />
          <h2>MAU Library</h2>
          <p>Global Circulation System</p>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>User ID or Email</label>
            <input
              type="text"
              placeholder="Enter ID or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btns">Sign In to Library</button>
        </form>

        <p className="signup-link">
          New to the library? <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;