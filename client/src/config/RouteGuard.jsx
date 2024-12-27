import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const RouteGuard = ({ isAuthenticated, isEmailVerified, children }) => {
  const location = useLocation();

  // Redirect unauthenticated users to login
  if (!isAuthenticated && location.pathname !== "/auth") {
    return <Navigate to="/auth" />;
  }

  // Redirect authenticated and verified users away from auth pages
  if (
    isAuthenticated &&
    isEmailVerified &&
    location.pathname.startsWith("/auth")
  ) {
    return <Navigate to="/" />;
  }

  // Redirect authenticated but unverified users to verify-email page
  if (
    isAuthenticated &&
    !isEmailVerified &&
    location.pathname !== "/auth/verify-email"
  ) {
    return <Navigate to="/auth/verify-email" />;
  }

  // Allow access to the current route
  return <>{children}</>;
};


export default RouteGuard;