import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addSong, updateSong } from "../slices/songSlice";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function AddEditSongPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existing = useSelector((s) => s.songs.list.find((song) => song.id === id));

  const [form, setForm] = useState(
    existing || { title: "", singer: "", year: "" }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existing) {
      dispatch(updateSong(form));
    } else {
      dispatch(addSong({ ...form, id: Date.now().toString() }));
    }
    navigate("/songs");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">{id ? "Edit Song" : "Add New Song"}</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange}/>
          <TextField label="Singer" name="singer" value={form.singer} onChange={handleChange}/>
          <TextField label="Year" name="year" value={form.year} onChange={handleChange}/>
          <Button type="submit" variant="contained">{id ? "Update" : "Add"}</Button>
        </Box>
      </Paper>
    </Container>
  );
}
