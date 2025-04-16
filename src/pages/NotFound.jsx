import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
        Go Back to Home
      </Link>
    </Box>
  );
};

export default NotFound;
