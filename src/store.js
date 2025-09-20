// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import songReducer from "./slices/songSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    songs: songReducer,
  },
});

export default store;
