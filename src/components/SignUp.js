import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';
import '../App.js'
import backgroundImage from '../assets/library1.avif';
import mekdela from '../assets/mau.jpg';
const SignUp = () => {
  const [formData, setFormData] = useState({ user_id: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Front-end Validation Logic
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.user_id) tempErrors.user_id = "ID Number is required";
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) tempErrors.email = "Enter a valid email address";
    
    if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage({ type: '', text: '' });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost/library/auth.php?action=signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApiMessage({ type: 'success', text: 'Registration Successful! Redirecting...' });
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setApiMessage({ type: 'error', text: data.error || 'Registration failed' });
      }
    } catch (err) {
      setApiMessage({ type: 'error', text: 'Server connection failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-card">
        <div className="signup-header">
        <img src={mekdela} alt="MAU Logo" className="login-logo-img" />
          <h2>MAU Library</h2>
          <p>Global Circulation System</p>
         
        </div>

        {apiMessage.text && (
          <div className={`alert-box alert-${apiMessage.type}`}>
            {apiMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>University ID / Username</label>
            <input 
              type="text" 
              className={errors.user_id ? 'input-error' : ''}
              placeholder="e.g. MAU/1234/16" 
              onChange={(e) => setFormData({...formData, user_id: e.target.value})} 
            />
            {errors.user_id && <p className="error-text">{errors.user_id}</p>}
          </div>

          <div className="form-group">
            <label>Email Account</label>
            <input 
              type="email" 
              className={errors.email ? 'input-error' : ''}
              placeholder="name@gmail.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Secure Password</label>
            <input 
              type="password" 
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••••" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <p className="footer-text">
          Already a member? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;