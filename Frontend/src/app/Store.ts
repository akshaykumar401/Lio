import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user.slice.ts";
import urlReducer from "../features/url/url.slice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    url: urlReducer,
  }
})