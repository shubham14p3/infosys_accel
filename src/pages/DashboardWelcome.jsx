// src/components/DashboardWelcome.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import gif from '../assets/1.gif';
const DashboardWelcome = () => {
    return (
        <Box
            sx={{
                height: '100%',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#6B7280',
                opacity: 0.8,
            }}
        >
            <img
                src={gif}
                alt="Welcome Animation"
                width="550"
                style={{ marginBottom: '1rem', borderRadius: '10px' }}
            />
            <Typography variant="h4" sx={{ fontWeight: 300 }}>
                Welcome to AOCAT
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, maxWidth: 400 }}>
                Your centralized automation control panel. Get started by selecting an option from the sidebar.
            </Typography>
        </Box>
    );
};

export default DashboardWelcome;
