import { createSlice } from "@reduxjs/toolkit";

const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const savedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: savedUsers,      
    currentUser: savedUser, 
    error: null,
  },
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.users.find((u) => u.email === email);
      if (exists) {
        state.error = "User already exists!";
      } else {
        const newUser = { name, email, password }; 
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
      }
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        state.currentUser = user; 
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.error = null;
      } else {
        state.error = "Invalid credentials";
      }
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser"); 
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
