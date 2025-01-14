import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/Signup.jsx";
import VerifyEmailPage from "./pages/VerifyEmail.jsx";
import LoginPage from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AuthenticatedRoutes from "./config/AuthenticatedRoutes.jsx";
import UnauthenticatedRoutes from "./config/UnAuthenticatedRoutes.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Redux/AuthSlice/AuthSlice.js";
import Loading from "./config/Loading.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";

const App = () => {

  const dispatch = useDispatch()
  const { isAuthenticated, isEmailVerified,isLoading } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    dispatch(checkAuth())

    
  }, [dispatch])
  

    if (isLoading) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loading />
        </div>
      );
    }
    


  return (
    <div className="text-3xl text-red-400 overflow-x-hidden">
      <Routes>
        {/* Authenticated Routes */}
        <Route
          element={
            <AuthenticatedRoutes
              isAuthenticated={isAuthenticated}
              isEmailVerified={isEmailVerified}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        {/* Unauthenticated Routes */}
        <Route
          element={
            <UnauthenticatedRoutes
              isAuthenticated={isAuthenticated}
              isEmailVerified={isEmailVerified}
            />
          }
        >
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
