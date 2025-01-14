import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  user: {},
  isAuthenticated: false,
  isEmailVerified: false,
  isLoading: false,
};

export const Signup = createAsyncThunk(
  "AuthSlice/Signup",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error in sign Up from frontend", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const VerifyEmail = createAsyncThunk(
  "AuthSlice/verifyEmail",
  async ({ code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify`, {
        code,
      }, {
        withCredentials: true
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error in verify email from frontend", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const Login = createAsyncThunk(
  "AuthSlice/login",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error in login from frontend", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/AuthSlice/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/check-auth`, {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-cache, no-store, must- revalidate, proxy-revalidate",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Logout = createAsyncThunk(
  "/AuthSlice/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true, // Required for cookie operations
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ForgotPassword = createAsyncThunk(
  "AuthSlice/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email,
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("Error in forgot password from frontend", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const ResetPassword = createAsyncThunk('AuthSlice/resetPassword', async ({ token, password }, { rejectWithValue }) => {
  try {

    const response = await axios.post(`${BASE_URL}/reset-password/${token}`, {
      password,
    });

    console.log(response.data);
    return response.data
    
  } catch (error) {

    console.log("Error in reset password from frontend", error.message);
    return rejectWithValue(error.message);
    
  }
})

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isEmailVerified = false;
      })
      .addCase(Signup.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isEmailVerified = false;
      })
      // Verify Email
      .addCase(VerifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isEmailVerified = true;
      })
      .addCase(VerifyEmail.rejected, (state) => {
        state.isLoading = false;
      })
      // Login
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Login.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isEmailVerified = true; // Since your backend only allows login for verified users
      })
      .addCase(Login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isEmailVerified = false;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isEmailVerified = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isEmailVerified = true;
        state.user = {};
      })
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = {};
      })
      .addCase(Logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ForgotPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ResetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ResetPassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AuthSlice.reducer;
