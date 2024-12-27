import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './AuthSlice/AuthSlice.js'

export const store = configureStore({
    reducer: {
      authSlice : AuthSlice,
  },
});
