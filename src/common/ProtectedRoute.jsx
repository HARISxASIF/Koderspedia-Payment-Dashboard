import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRole }) => {
  const { user } = useSelector((state) => state.auth);
  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user has the wrong role, redirect to access-denied
  if (user.role !== allowedRole) {
    return <Navigate to="/access-denied" replace />;
  }

  // If everything is okay, render the component
  return <Component />;
};

export default ProtectedRoute;