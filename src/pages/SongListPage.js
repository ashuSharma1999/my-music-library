import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, updateSong, deleteSong } from "../slices/songSlice";

import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import { PlayArrow, Delete, Edit, Person } from "@mui/icons-material";

const SongListPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((s) => s.auth.currentUser);
  const songs = useSelector((s) => s.songs.list);

  const userSongs = songs.filter((song) => song.userId === user?.email);

  const [editingSong, setEditingSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    singer: "",
    year: "",
    audioUrl: "",
  });

  const [singerFilter, setSingerFilter] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [yearRange, setYearRange] = useState({ from: "", to: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdate = () => {
    if (editingSong) {
      dispatch(updateSong({ ...formData, userId: user.email }));
    } else {
      dispatch(
        addSong({
          ...formData,
          id: Date.now().toString(),
          userId: user.email,
        })
      );
    }
    setFormData({ id: "", title: "", singer: "", year: "", audioUrl: "" });
    setEditingSong(null);
  };

  const handleEdit = (song) => {
    setEditingSong(song.id);
    setFormData(song);
  };

  const handleDelete = (id) => {
    dispatch(deleteSong(id));
    if (currentSong?.id === id) {
      setCurrentSong(null);
    }
  };

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

 
  const filteredSongs = userSongs.filter((song) => {
    const matchesSinger = singerFilter
      ? song.singer.toLowerCase().includes(singerFilter.toLowerCase())
      : true;

    const matchesAlphabet = alphabetFilter
      ? song.title.toLowerCase().startsWith(alphabetFilter.toLowerCase())
      : true;

    const matchesYear =
      (!yearRange.from || song.year >= yearRange.from) &&
      (!yearRange.to || song.year <= yearRange.to);

    return matchesSinger && matchesAlphabet && matchesYear;
  });

  return (
    <Box sx={{ p: 3 }}>
  
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: 3, bgcolor: "#f0f4f8", p: 2, borderRadius: 2 }}
      >
        <Avatar>
          <Person />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          Welcome, {user?.name || user?.email}
        </Typography>
      </Stack>

      <Card sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editingSong ? "✏ Edit Song" : "➕ Add New Song"}
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            label="Song Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Singer"
            name="singer"
            value={formData.singer}
            onChange={handleChange}
          />
          <TextField
            label="Song URL (mp3)"
            name="audioUrl"
            value={formData.audioUrl}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrUpdate}
          >
            {editingSong ? "Update Song" : "Add Song"}
          </Button>
        </Stack>
      </Card>

      <Card sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          🔍 Filters
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            label="Filter by Singer"
            value={singerFilter}
            onChange={(e) => setSingerFilter(e.target.value)}
          />
          <TextField
            label="Filter by Alphabet"
            inputProps={{ maxLength: 1 }}
            value={alphabetFilter}
            onChange={(e) => setAlphabetFilter(e.target.value)}
          />
          <TextField
            label="Year From"
            type="number"
            value={yearRange.from}
            onChange={(e) =>
              setYearRange((prev) => ({ ...prev, from: e.target.value }))
            }
          />
          <TextField
            label="Year To"
            type="number"
            value={yearRange.to}
            onChange={(e) =>
              setYearRange((prev) => ({ ...prev, to: e.target.value }))
            }
          />
        </Stack>
      </Card>

      <Stack spacing={2}>
        {filteredSongs.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No songs found 🎶
          </Typography>
        )}
        {filteredSongs.map((song) => (
          <Card
            key={song.id}
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              transition: "0.3s",
              "&:hover": { boxShadow: 6, transform: "scale(1.01)" },
            }}
          >
            <CardContent>
              <Typography variant="h6">{song.title}</Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <Chip label={song.singer} color="info" size="small" />
                <Chip label={song.year} color="secondary" size="small" />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handlePlay(song)}
                variant="contained"
                color="success"
                startIcon={<PlayArrow />}
              >
                Play
              </Button>
              <Button
                size="small"
                onClick={() => handleEdit(song)}
                variant="outlined"
                startIcon={<Edit />}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => handleDelete(song.id)}
                variant="outlined"
                color="error"
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {currentSong && (
        <Card sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            🎧 Now Playing: {currentSong.title} ({currentSong.singer})
          </Typography>
          <audio
            controls
            autoPlay
            src={currentSong.audioUrl}
            style={{ width: "100%" }}
          />
        </Card>
      )}
    </Box>
  );
};

export default SongListPage;
