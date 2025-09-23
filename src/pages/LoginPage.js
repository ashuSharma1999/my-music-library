import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Box, Paper
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
    navigate("/songs");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField name="email" label="Email" value={form.email} onChange={handleChange}/>
          <TextField type="password" name="password" label="Password" value={form.password} onChange={handleChange}/>
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}
