import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface ProtectedRouteProps {
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { token, userRole } = useSelector((state: RootState & { auth: { userRole: string } }) => state.auth);

  if (!token) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    // User does not have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role
  return <Outlet />;
};

export default ProtectedRoute;
