import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp';
const SignUp = () => {
  // 1. የኮሌጅ እና የዲፓርትመንት ዳታ ዝርዝር
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

  // የኢንፑት ለውጦችን ለመቆጣጠር
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "college") {
      // ኮሌጅ ሲቀየር ዲፓርትመንቱን ባዶ እናደርጋለን
      setFormData({ 
        ...formData, 
        college: value, 
        department: '' 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // ቀላል ቫሊዴሽን
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

    // Mock registration - እዚህ ጋር API መጠራት አለበት
    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
     <div className="signup-container">
    <div className="signup-card">
      <div className="signup-header">
        <h2>Create Account</h2>
        <div className="divider"></div>
        <p>Join the Library Circulation System</p>
      </div>
      
      {error && <div className="alert-error">{error}</div>}
      {success && <div className="alert-success">{success}</div>}
      
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="example@univ.edu.et"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
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
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          {/* College Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 outline-none"
              required
            >
              <option value="">-- Select College --</option>
              {Object.keys(collegeData).map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>

          {/* Department Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!formData.college}
              className={`w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 outline-none ${!formData.college ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
              required
            >
              <option value="">-- Select Department --</option>
              {formData.college && collegeData[formData.college].map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
            </select>
          </div>

           <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

       <div className="login-link">
        <p>Already have an account? <Link to="/login">Sign In here</Link></p>
      </div>
      </div>
    </div>
  );
};

export default SignUp;