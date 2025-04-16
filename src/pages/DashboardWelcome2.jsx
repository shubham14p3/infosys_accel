import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, fetchExcelFiles, fetchExecutionResults } from '../redux/fileSlice';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: '95%', // Ensure paper components take full height
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
}));

const DashboardWelcome2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { files, excelFiles, metrics, executionResults, loading } = useSelector((state) => state.files);
  const [timeRange, setTimeRange] = useState('week');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    dispatch(fetchFiles());
    dispatch(fetchExcelFiles());
    dispatch(fetchExecutionResults());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Full height of the parent container
        overflow: 'hidden', // Prevent scrollbars
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
          Dashboard Overview
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label="Time Range"
          >
            <MenuItem value="day">Last 24 Hours</MenuItem>
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'auto', // Enable scrolling for content if needed
        }}
      >
        {/* Stats Row */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper onClick={() => navigate('/dashboard/generate-events')}>
              <Typography variant="h6" gutterBottom>
                Total SIDE Files
              </Typography>
              <Typography variant="h4" color="primary">
                {files?.length || 'No Data'}
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper onClick={() => navigate('/dashboard/execute')}>
              <Typography variant="h6" gutterBottom>
                Total XLSX Files
              </Typography>
              <Typography variant="h4" color="success.main">
                {excelFiles?.length || 'No Data'}
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Deleted Files
              </Typography>
              <Typography variant="h4" color="error.main">
                {metrics?.deletedFiles || 'No Data'}
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Executed Files
              </Typography>
              <Typography variant="h4" color="warning.main">
                {metrics?.executedFiles || 'No Data'}
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Test Execution Trends
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flex: 1, minHeight: 200 }}>
                {executionResults?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={executionResults}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" />
                      <Line type="monotone" dataKey="passed" stroke="#4caf50" />
                      <Line type="monotone" dataKey="failed" stroke="#f44336" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography variant="body1" color="text.secondary" align="center">
                    No Data Available
                  </Typography>
                )}
              </Box>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                File Distribution
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flex: 1, minHeight: 200 }}>
                {files?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={files.map((file, index) => ({
                          name: file.name,
                          value: index + 1,
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {files.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography variant="body1" color="text.secondary" align="center">
                    No Data Available
                  </Typography>
                )}
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardWelcome2;
