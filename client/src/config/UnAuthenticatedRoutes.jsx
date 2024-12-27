// UnAuthenticatedRoutes.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UnauthenticatedRoutes = ({ isAuthenticated, isEmailVerified }) => {
  const location = useLocation();
  const isVerifyEmailPage = location.pathname === "/auth/verify-email";

  // If authenticated and email verified, redirect to home
  if (isAuthenticated && isEmailVerified) {
    return <Navigate to="/" replace />;
  }

  // If authenticated but email not verified
  if (isAuthenticated && !isEmailVerified) {
    // If they're trying to access verify-email page, allow it
    if (isVerifyEmailPage) {
      return <Outlet />;
    }
    // If they're trying to access any other auth page, redirect to verify-email
    return <Navigate to="/auth/verify-email" replace />;
  }

  // If not authenticated, allow access to auth routes
  return <Outlet />;
};

export default UnauthenticatedRoutes;
