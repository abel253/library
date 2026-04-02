// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;