import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [darkMode, setDarkMode] = React.useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/dashboard');
  };
  const logOut = () => {
    navigate('/signin');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            A
          </Box>

          {/* Title */}
          <Typography variant="h6" noWrap>
            Anyone Can Automate Tool
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title="Home" arrow>
            <IconButton color="inherit" onClick={goHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings" arrow>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile" arrow>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Current Time" arrow>
            <IconButton color="inherit">
              <AccessTimeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Change Language" arrow>
            <IconButton color="inherit">
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout" arrow>
            <IconButton color="inherit" onClick={logOut}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
