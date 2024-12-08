const { CosmosClient } = require('@azure/cosmos');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

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

    // Validate input
    if (!model || !messages) {
      return res.status(400).send('Request body must include "model" and "messages".');
    }

    // Log the request body for debugging
    console.log("Request Body:", req.body);

    // Send request to OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model, messages },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if response contains expected data
    console.log("OpenAI Response:", response.data);
    if (!response.data || !response.data.usage) {
      return res.status(500).send('Unexpected response from OpenAI API.');
    }

    // Extract usage data and prepare log entry
    const usage = response.data.usage;
    console.log("Usage Data:", usage);

    const logEntry = {
      id: `${Date.now()}`, // Unique ID for the document
      timestamp: new Date().toISOString(),
      model,
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      total_tokens: usage.total_tokens,
      prompt_details: usage.prompt_tokens_details || {},
      completion_details: usage.completion_tokens_details || {},
    };

    // Save log to Cosmos DB
    try {
      await container.items.create(logEntry);
      console.log("Log saved to Cosmos DB:", logEntry);
    } catch (cosmosError) {
      console.error("Error saving log to Cosmos DB:", cosmosError.message);
      return res.status(500).send("Error saving usage logs to Cosmos DB.");
    }

    // Send back OpenAI's response
    res.json(response.data);
  } catch (error) {
    // Log detailed error for debugging
    console.error("Error communicating with OpenAI API:", error.response?.data || error.message);
    console.error("Full Error Object:", error.toJSON ? error.toJSON() : error);
    res.status(500).send(error.response?.data || 'Error communicating with OpenAI API');
  }
});

// Fetch usage logs
app.get('/api/usage', async (req, res) => {
  try {
    const { resources } = await container.items.query('SELECT * FROM c ORDER BY c.timestamp DESC').fetchAll();
    res.json(resources);
  } catch (error) {
    console.error("Error fetching usage logs:", error.message);
    res.status(500).send("Error fetching usage logs");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
