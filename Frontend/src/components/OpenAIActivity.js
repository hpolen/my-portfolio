import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OpenAIActivity = () => {
  const [metrics, setMetrics] = useState(null); // Stores the metrics data
  const [filteredData, setFilteredData] = useState(null); // Stores filtered data for charts
  const [selectedMonth, setSelectedMonth] = useState('All'); // Selected month for filtering
  const [loading, setLoading] = useState(true); // Manages the loading state
  const [error, setError] = useState(false); // Manages the error state

  // Function to fetch metrics from the backend
  const fetchMetrics = async () => {
    try {
      const response = await axios.get('/api/usage/metrics'); // Fetch data from backend
      console.log('Metrics Updated:', response.data); // Debugging: log the fetched data
      setMetrics(response.data); // Update metrics state with the response
      setFilteredData(response.data.timeUsage); // Initially, show all data
      setError(false); // Reset error state if successful
    } catch (err) {
      console.error('Error fetching metrics:', err.message);
      setError(true); // Set error state if API call fails
    } finally {
      setLoading(false); // Ensure loading spinner stops
    }
  };

  // Effect to fetch data initially and set up data refresh
  useEffect(() => {
    fetchMetrics(); // Fetch data on component mount

    // Set interval to refresh data every 60 seconds
    const interval = setInterval(() => {
      fetchMetrics(); // Refresh metrics periodically
    }, 15 * 60 * 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Handle month selection
  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === 'All') {
      setFilteredData(metrics.timeUsage); // Reset to show all data
    } else {
      // Filter data by selected month
      const filtered = metrics.timeUsage.filter((item) =>
        item.date.startsWith(month)
      );
      setFilteredData(filtered);
    }
  };

  // Loading state: Display a spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Error state: Display an error message
  if (error || !metrics) {
    return (
      <Typography variant="h6" color="error">
        Failed to load metrics. Please try again later.
      </Typography>
    );
  }

  // Generate unique months for the dropdown from available data
  const availableMonths = [
    'All',
    ...Array.from(
      new Set(metrics.timeUsage.map((item) => item.date.slice(0, 7)))
    ),
  ];

  // Prepare chart data for total tokens
  const totalTokensData = {
    labels: filteredData.map((item) => item.date), // X-axis: dates
    datasets: [
      {
        label: 'Total Tokens',
        data: filteredData.map((item) => item.totalTokens), // Y-axis: total tokens
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for inbound tokens
  const inboundTokensData = {
    labels: filteredData.map((item) => item.date), // X-axis: dates
    datasets: [
      {
        label: 'Inbound Tokens (Prompt)',
        data: filteredData.map((item) => item.promptTokens), // Y-axis: prompt tokens
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for outbound tokens
  const outboundTokensData = {
    labels: filteredData.map((item) => item.date), // X-axis: dates
    datasets: [
      {
        label: 'Outbound Tokens (Completion)',
        data: filteredData.map((item) => item.completionTokens), // Y-axis: completion tokens
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Bar color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tokens',
        },
      },
    },
  };

  return (
    <Box p={4} mt={8}> {/* Added mt={8} to create vertical space */}
      <Typography variant="h4" gutterBottom>
        OpenAI Usage Metrics
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Tokens: {metrics.totalTokens}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Model Usage:
      </Typography>
      <ul>
        {metrics.modelUsage.map((model) => (
          <li key={model.model}>
            <Typography variant="body1">
              {model.model}: {model.totalTokens} tokens
            </Typography>
          </li>
        ))}
      </ul>

      {/* Month Filter Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          label="Filter by Month"
        >
          {availableMonths.map((month) => (
            <MenuItem key={month} value={month}>
              {month === 'All' ? 'All Months' : month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Total Tokens Chart */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Usage Over Time (Total Tokens):
        </Typography>
        <Bar data={totalTokensData} options={chartOptions} />
      </Box>

      {/* Inbound Tokens Chart */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Inbound Tokens Over Time (Prompt Tokens):
        </Typography>
        <Bar data={inboundTokensData} options={chartOptions} />
      </Box>

      {/* Outbound Tokens Chart */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Outbound Tokens Over Time (Completion Tokens):
        </Typography>
        <Bar data={outboundTokensData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default OpenAIActivity;
