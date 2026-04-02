import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css'; // ensure this matches your CSS filename

const SignUp = () => {
  const collegeData = {
    "College of Computing and Informatics": [
      "Computer Science", 
      "Information Technology", 
      "Software Engineering", 
      "Information Systems"
    ],
    "College of Engineering and Technology": [
      "Electrical Engineering", 
      "Mechanical Engineering", 
      "Civil Engineering", 
      "Chemical Engineering"
    ],
    "College of Business and Economics": [
      "Accounting", 
      "Management", 
      "Economics", 
      "Marketing"
    ],
    "College of Health Sciences": [
      "Medicine", 
      "Nursing", 
      "Pharmacy", 
      "Public Health"
    ],
    "College of Natural Science": [
      "Biology",
      "Chemistry",
      "Physics",
      "Mathematics"
    ]
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    college: '',      
    department: '',   
    userType: 'Student'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "college") {
      setFormData({ ...formData, college: value, department: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // 1. Basic Front-end Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.college || !formData.department) {
      setError('Please select both College and Department');
      return;
    }

    // 2. API Call to PHP
    try {
      const response = await fetch('http://localhost/library/auth.php?action=signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: formData.username, // Matches SQL 'user_id'
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          department: `${formData.college} - ${formData.department}` // Combines for SQL 'department'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        // This catches errors like "Email already exists" from PHP
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Connection refused. Please ensure XAMPP/WAMP is running and the path is correct.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
          <div className="divider"></div>
          <p>Join the Library Circulation System</p>
        </div>
        
        {error && <div className="alert-error" style={{backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '5px', marginBottom: '10px'}}>{error}</div>}
        {success && <div className="alert-success" style={{backgroundColor: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '5px', marginBottom: '10px'}}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name <span className="required-star">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@univ.edu.et"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username / User ID</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. S001"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
            >
              <option value="">-- Select College --</option>
              {Object.keys(collegeData).map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!formData.college}
              className={!formData.college ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
              required
            >
              <option value="">-- Select Department --</option>
              {formData.college && collegeData[formData.college].map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" style={{marginTop: '20px'}}>
            Create Account
          </button>
        </form>

        <div className="login-link" style={{textAlign: 'center', marginTop: '15px'}}>
          <p>Already have an account? <Link to="/login">Sign In here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;