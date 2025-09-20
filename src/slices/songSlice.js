// src/slices/songSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], 
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.list.push(action.payload);
    },
    updateSong: (state, action) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSong: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSong, updateSong, deleteSong } = songSlice.actions;
export default songSlice.reducer;
