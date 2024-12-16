const { CosmosClient } = require('@azure/cosmos');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for local and production
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Local development frontend
      'https://www.harry-polen.com', // Replace with your production frontend URL
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

// Cosmos DB configuration
const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const database = client.database('openai_usage_logs');
const container = database.container('usage_logs');

// Middleware
app.use(bodyParser.json());

// Proxy route for OpenAI API
app.post('/api/openai', async (req, res) => {
  try {
    const { model, messages } = req.body;

    if (!model || !messages) {
      return res.status(400).send('Request body must include "model" and "messages".');
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model, messages },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { usage } = response.data;

    const logEntry = {
      id: `${Date.now()}`, // Unique ID
      timestamp: new Date().toISOString(),
      model,
      prompt_tokens: usage.prompt_tokens || 0,
      completion_tokens: usage.completion_tokens || 0,
      total_tokens: usage.total_tokens || 0,
    };

    await container.items.create(logEntry);

    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error.message);
    res.status(500).send('Error communicating with OpenAI API');
  }
});

// Fetch aggregated usage metrics
app.get('/api/usage/metrics', async (req, res) => {
  try {
    console.log('Fetching total tokens...');
    const totalTokensQuery = 'SELECT VALUE SUM(c.total_tokens) FROM c';
    const { resources: totalTokens } = await container.items.query(totalTokensQuery).fetchAll();
    console.log('Total Tokens:', totalTokens);

    console.log('Fetching model-specific usage...');
    const modelUsageQuery = `
      SELECT c.model, SUM(c.total_tokens) AS totalTokens
      FROM c
      GROUP BY c.model
    `;
    const { resources: modelUsage } = await container.items.query(modelUsageQuery).fetchAll();
    console.log('Model Usage:', modelUsage);

    console.log('Fetching usage over time...');
    const timeUsageQuery = `
      SELECT 
        SUBSTRING(c.timestamp, 0, 10) AS date_segment, 
        SUM(c.total_tokens) AS totalTokens,
        SUM(c.prompt_tokens) AS promptTokens,
        SUM(c.completion_tokens) AS completionTokens
      FROM c
      WHERE IS_DEFINED(c.timestamp)
      GROUP BY SUBSTRING(c.timestamp, 0, 10)
    `;
    const { resources: timeUsage } = await container.items.query(timeUsageQuery).fetchAll();
    console.log('Time Usage:', timeUsage);

    res.json({
      totalTokens: totalTokens[0] || 0,
      modelUsage: modelUsage || [],
      timeUsage: timeUsage.map(({ date_segment, totalTokens, promptTokens, completionTokens }) => ({
        date: date_segment,
        totalTokens,
        promptTokens,
        completionTokens,
      })),
    });
  } catch (error) {
    console.error('Error fetching usage metrics:', error.message);
    res.status(500).send('Error fetching usage metrics');
  }
});

// Fetch all usage logs
app.get('/api/usage', async (req, res) => {
  try {
    const { resources } = await container.items.query('SELECT * FROM c ORDER BY c.timestamp DESC').fetchAll();
    console.log('Fetched Logs:', resources);
    res.json(resources);
  } catch (error) {
    console.error('Error fetching usage logs:', error.message);
    res.status(500).send('Error fetching usage logs');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
