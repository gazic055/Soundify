import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoId, setVideoId] = useState('VK_pgLNLBXg'); // Default video ID

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 1,
          q: searchTerm,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      });
      setVideoId(response.data.items[0].id.videoId);
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom component="div" style={{ textAlign: 'center' }}>
            Soundify
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <TextField
              label="Search for a song"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mr: 1, width: '25ch' }}
            />
            <Button variant="contained" onClick={handleSearch} color="primary">
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {videoId && (
            <Paper elevation={6}>
              <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                frameBorder="0"
                allow="autoplay"
                style={{ width: '100%', maxWidth: '640px', height: '360px', borderRadius: '4px' }}
              ></iframe>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
