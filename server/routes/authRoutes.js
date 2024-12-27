
import express from "express";
import {
  SignUp,
  VerifyEmail,
  Login,
  forgotPassword,
  resetPassword,
  verifyToken,
  checkAuth,
  Logout,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post('/signup', SignUp)
router.post('/verify', VerifyEmail)
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);


export default router