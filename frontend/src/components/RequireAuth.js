import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const RequireAuth = ({ children, allowedRoles }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to='/login' />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.userData.role)) {
    return <Navigate to='/error' />;
  }

  return children;
};

export default RequireAuth;
