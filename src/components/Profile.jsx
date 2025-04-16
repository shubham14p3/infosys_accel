import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Paper,
  Container,
  Typography,
  Avatar,
  IconButton,
  TextField,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    profilePic: null,
  });

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });

    // Reset dependent fields when parent field changes
    if (field === 'country') {
      setProfileData((prev) => ({ ...prev, state: '', city: '' }));
    } else if (field === 'state') {
      setProfileData((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profilePic: URL.createObjectURL(file) });
    }
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const pincodeRegex = /^[0-9]{5,6}$/;

    if (!profileData.name.trim()) {
      alert('Name is required');
      return false;
    }
    if (!emailRegex.test(profileData.email)) {
      alert('Invalid email address');
      return false;
    }
    if (!phoneRegex.test(profileData.phone)) {
      alert('Invalid phone number');
      return false;
    }
    if (!profileData.country) {
      alert('Country is required');
      return false;
    }
    if (!profileData.state) {
      alert('State is required');
      return false;
    }
    if (!profileData.city) {
      alert('City is required');
      return false;
    }
    if (!pincodeRegex.test(profileData.pincode)) {
      alert('Invalid pincode');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ backgroundColor: '#f9f9f9' }}
    >
      <Header />
      <Container maxWidth="md" sx={{ marginTop: 10, flex: 1, marginBottom: 10 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box textAlign="center" mb={4}>
            <Avatar
              src={profileData.profilePic}
              alt="Profile Picture"
              sx={{ width: 100, height: 100, margin: '0 auto' }}
            />
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            </IconButton>
          </Box>
          <Typography variant="h5" gutterBottom textAlign="center">
            Update Your Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                value={profileData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                placeholder="Enter your email"
                value={profileData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="Enter your phone number"
                value={profileData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                placeholder="Enter your address"
                value={profileData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                placeholder="Enter your country"
                value={profileData.country}
                onChange={(e) => handleChange('country', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                placeholder="Enter your state"
                value={profileData.state}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                placeholder="Enter your city"
                value={profileData.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                placeholder="Enter your pincode"
                value={profileData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 4, textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Profile;
