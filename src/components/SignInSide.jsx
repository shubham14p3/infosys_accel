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
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import GTranslateIcon from '@mui/icons-material/GTranslate'; // Placeholder for Google
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import iconHome from '../assets/appIcon.png';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#0D1117', // Very dark background (outer)
      paper: '#161B22', // Slightly lighter dark (inner panels)
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
            width: '100%',
            maxWidth: 900, // reduce this from 1200 to 900 or even 800
            mx: 'auto',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
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
                AOCAT
              </Typography>

              {/* Bullet points */}
              <Box sx={{ color: 'text.secondary' }}>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  <strong style={{ color: '#fff' }}>Effortless Automation:</strong> Aocat is an
                  innovative tool that anyone automate tasks without hassle.
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  <strong style={{ color: '#fff' }}>Build on React for speed:</strong> Experience
                  Lightning fast performance and responsiveness thanks to its React-based
                  architecture.
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                  <strong style={{ color: '#fff' }}>Hands Free Testing:</strong> Aocat handles
                  Automation testing for you, eliminationg the need for manual effort.
                </Typography>
                <Typography variant="subtitle1">
                  <strong style={{ color: '#fff' }}>Automation Proble solving:</strong> From
                  Identifying issues to fixing them, Aocat does all accurately and efficiently.{' '}
                </Typography>
                <Typography variant="subtitle1">
                  <strong style={{ color: '#fff' }}>Reliable & Accurate:</strong> From Count on
                  Aocat for Consistent, precise results every time, making your workflow smoother
                  then ever.{' '}
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
                  {/* <LockOutlinedIcon /> */}
                  <img src={iconHome} alt="AOCAT" width="100%" />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Welcome to AOCAT
                </Typography>
              </Box>

              {/* Form fields */}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ width: '100%', mt: 1 }}
              >
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

                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Link href="#" variant="body2">
                    Forgot your password?
                  </Link>
                </Box>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
                <Button variant="outlined" fullWidth startIcon={<GTranslateIcon />} sx={{ mb: 1 }}>
                  Sign in with Google
                </Button>
                <Button variant="outlined" fullWidth startIcon={<FacebookIcon />}>
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
