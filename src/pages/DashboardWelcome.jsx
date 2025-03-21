// src/components/DashboardWelcome.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

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
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG5hZXJwbmx5N2NybndvMnQzbTd4c2U5bnBhZmVnbTgzZXRwcjNxZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YTbZzCkRQCEJa/giphy.gif"
                alt="Welcome Animation"
                width="250"
                style={{ marginBottom: '1rem', borderRadius: '10px' }}
            />
            <Typography variant="h4" sx={{ fontWeight: 300 }}>
                Welcome to AOAAL
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, maxWidth: 400 }}>
                Your centralized automation control panel. Get started by selecting an option from the sidebar.
            </Typography>
        </Box>
    );
};

export default DashboardWelcome;
