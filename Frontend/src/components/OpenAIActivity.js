import React, { useState, useEffect, useCallback } from 'react';
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
  const [metrics, setMetrics] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Dynamic API Base URL (defaults to localhost for development)
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

  // Function to fetch metrics from the backend
  const fetchMetrics = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/usage/metrics`);
      console.log('Metrics Updated:', response.data);
      setMetrics(response.data);
      setFilteredData(response.data.timeUsage);
      setError(false);
    } catch (err) {
      console.error('Error fetching metrics:', err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchMetrics(); // Fetch data on component mount

    const interval = setInterval(() => {
      fetchMetrics(); // Refresh metrics periodically
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchMetrics]);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === 'All') {
      setFilteredData(metrics.timeUsage);
    } else {
      const filtered = metrics.timeUsage.filter((item) =>
        item.date.startsWith(month)
      );
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !metrics) {
    return (
      <Typography variant="h6" color="error">
        Failed to load metrics. Please try again later.
      </Typography>
    );
  }

  const availableMonths = [
    'All',
    ...Array.from(
      new Set(metrics.timeUsage.map((item) => item.date.slice(0, 7)))
    ),
  ];

  const totalTokensData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: 'Total Tokens',
        data: filteredData.map((item) => item.totalTokens),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const inboundTokensData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: 'Inbound Tokens (Prompt)',
        data: filteredData.map((item) => item.promptTokens),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const outboundTokensData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: 'Outbound Tokens (Completion)',
        data: filteredData.map((item) => item.completionTokens),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

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
    <Box p={4} mt={8}>
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

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Usage Over Time (Total Tokens):
        </Typography>
        <Bar data={totalTokensData} options={chartOptions} />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Inbound Tokens Over Time (Prompt Tokens):
        </Typography>
        <Bar data={inboundTokensData} options={chartOptions} />
      </Box>

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
