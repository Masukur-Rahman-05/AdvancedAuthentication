import { User } from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateJWT } from "../utils/generateJWT.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  PasswordResetEmail,
  PasswordResetSuccessfulEmail,
} from "../resend/email.js";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: verificationToken,
      verificationTokenExpire: new Date(Date.now() + 15 * 60 * 1000),
    });

    await user.save();

    generateJWT(res, user._id);
    // await sendVerificationEmail(user.email, verificationToken);
    console.log("Attempting to send verification email..."); // Debug log
    try {
      await sendVerificationEmail(user.email, verificationToken);
      console.log("Verification email sent successfully"); // Debug log
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return res.status(500).json({
        success: false,
        message:
          "User created but failed to send verification email: " +
          emailError.message,
      });
    }


    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create User in Backend" + error.message,
    });
  }
};

export const VerifyEmail = async (req, res) => {
  const { code } = req.body;

  console.log(code)

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Verification code is required",
    });
  }
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Verification Code",
      });
    } else {
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;

      await user.save();
    }

    await sendWelcomeEmail(user.email, user.name);
    

    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify email",
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password)
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const isVerified = user.isVerified;
    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is not verified",
      });
    }

    generateJWT(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    const resetLink = `${process.env.CLIENT_URI}/auth/reset-password/${resetPasswordToken}`;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save();

    await PasswordResetEmail(user.email, resetLink, user.name);

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    await PasswordResetSuccessfulEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    console.log(decoded);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to authorized user",
    });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: { ...user._doc } });
  } catch (error) {
    console.log("error checking auth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
