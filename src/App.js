import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slices/authSlice";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SongListPage from "./pages/SongListPage";
import AddEditSongPage from "./pages/AddEditSongPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.currentUser);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Music Manager
          </Typography>
          {user ? (
            <>
              <Button component={Link} to="/songs" color="inherit">
                My Songs
              </Button>
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/songs"
            element={
              <ProtectedRoute>
                <SongListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/songs/new"
            element={
              <ProtectedRoute>
                <AddEditSongPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/songs/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditSongPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
