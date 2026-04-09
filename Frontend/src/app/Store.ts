import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user.slice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  }
})