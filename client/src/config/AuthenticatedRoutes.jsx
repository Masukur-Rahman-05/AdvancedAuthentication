// AuthenticatedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = ({ isAuthenticated, isEmailVerified }) => {
  // If not authenticated at all, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated but email not verified, redirect to verify email
  if (isAuthenticated && !isEmailVerified) {
    return <Navigate to="/auth/verify-email" replace />;
  }

  // If authenticated and email verified, allow access to protected routes
  return <Outlet />;
};

export default AuthenticatedRoutes;
