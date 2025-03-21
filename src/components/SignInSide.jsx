import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import GTranslateIcon from '@mui/icons-material/GTranslate'; // Placeholder for Google
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        background: {
            default: '#0D1117',  // Very dark background (outer)
            paper: '#161B22',    // Slightly lighter dark (inner panels)
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default function SignInSide() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle sign-in logic here
        navigate('/dashboard');
        console.log('Signing in...');
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            {/* Outer Box to center everything with a dark background */}
            <Box
                sx={{
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                {/* Container Paper for the two-column layout */}
                <Paper
                    elevation={2}
                    sx={{
                        width: { xs: '100%', md: '70%', lg: '60%' }, // adjust to control overall width
                        maxWidth: 1200,
                        borderRadius: 2,
                        overflow: 'hidden',
                        display: 'flex',
                    }}
                >
                    <Grid container>
                        {/* LEFT SIDE: brand + bullet points */}
                        <Grid
                            item
                            xs={12}
                            md={5}
                            sx={{
                                bgcolor: 'background.default',
                                p: { xs: 3, sm: 4 },
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Brand name */}
                            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                                Sitemark
                            </Typography>

                            {/* Bullet points */}
                            <Box sx={{ color: 'text.secondary' }}>
                                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                                    <strong style={{ color: '#fff' }}>Adaptable performance:</strong>{' '}
                                    Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.
                                </Typography>
                                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                                    <strong style={{ color: '#fff' }}>Built to last:</strong>{' '}
                                    Experience unmatched durability that goes above and beyond with lasting investment.
                                </Typography>
                                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                                    <strong style={{ color: '#fff' }}>Great user experience:</strong>{' '}
                                    Integrate our product into your routine with an intuitive and easy-to-use interface.
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong style={{ color: '#fff' }}>Innovative functionality:</strong>{' '}
                                    Stay ahead with features that set new standards, addressing your evolving needs faster than ever.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* RIGHT SIDE: sign-in form */}
                        <Grid
                            item
                            xs={12}
                            md={7}
                            sx={{
                                bgcolor: 'background.paper',
                                p: { xs: 3, sm: 4 },
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Lock icon and heading */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                            </Box>

                            {/* Form fields */}
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Link href="#" variant="body2">
                                        Forgot your password?
                                    </Link>
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>

                                <Grid container sx={{ mb: 2 }}>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign up"}
                                        </Link>
                                    </Grid>
                                </Grid>

                                {/* Social sign-in buttons with icons */}
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<GTranslateIcon />}
                                    sx={{ mb: 1 }}
                                >
                                    Sign in with Google
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<FacebookIcon />}
                                >
                                    Sign in with Facebook
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
