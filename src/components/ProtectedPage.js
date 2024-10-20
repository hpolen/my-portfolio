// src/components/ProtectedPage.js

import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Toolbar, // Import Toolbar for spacing
} from '@mui/material';
import { styled } from '@mui/system';

// Styled Components for Chat Interface
const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 800,
  margin: 'auto',
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  marginBottom: theme.spacing(2),
}));

const Message = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[300],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

// Chatbot Selector (Optional)
const ChatbotSelector = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minWidth: 200,
}));

// Updated query function with Authorization header
async function query(data) {
  const response = await fetch(
    "https://flowise-5ho4.onrender.com/api/v1/prediction/fe4fa6cb-b1b8-433d-9637-d099c59ef15a",
    {
      headers: {
        Authorization: "Bearer u05FPtq5wFIkxRLSjKbu2EGvUj3btqak_LULQERSw-4",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch chatbot response');
  }
  
  const result = await response.json();
  return result;
}

const ProtectedPage = () => {
  // State for chat history
  const [messages, setMessages] = useState([]);
  // State for user input
  const [input, setInput] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);
  // State for selected chatbot (if multiple)
  const [selectedChatbot, setSelectedChatbot] = useState('fe4fa6cb-b1b8-433d-9637-d099c59ef15a'); // Updated chatbot ID

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handler for sending messages
  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user's message to chat history
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Query the Flowise backend
      const response = await query({ question: input });

      // **Debugging Step:** Log the entire response
      console.log('Flowise Response:', response);

      // Determine where the answer is located in the response
      let botAnswer = '';

      // **Assumption 1:** If response has 'data.answer'
      if (response.data && response.data.answer) {
        botAnswer = response.data.answer;
      }
      // **Assumption 2:** If response has 'answer' directly
      else if (response.answer) {
        botAnswer = response.answer;
      }
      // **Assumption 3:** If response structure is different
      else {
        // Extract the first key that might contain the answer
        const keys = Object.keys(response);
        if (keys.length > 0) {
          botAnswer = response[keys[0]];
        } else {
          botAnswer = 'Sorry, I did not understand that.';
        }
      }

      // Add chatbot's response to chat history
      const botMessage = { sender: 'bot', text: botAnswer || 'Sorry, I did not understand that.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      // Add error message to chat history
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handler for Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handler for chatbot selection change (Optional)
  const handleChatbotChange = (e) => {
    setSelectedChatbot(e.target.value);
    // Optionally, clear chat history when switching chatbots
    setMessages([]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Toolbar spacer to push content below the fixed navbar */}
      <Toolbar />

      <Typography variant="h4" gutterBottom>
        Chatbot Tester
      </Typography>
      {/* Optional: Chatbot Selector */}
      <ChatbotSelector>
        <InputLabel id="chatbot-selector-label">Select Chatbot</InputLabel>
        <Select
          labelId="chatbot-selector-label"
          id="chatbot-selector"
          value={selectedChatbot}
          label="Select Chatbot"
          onChange={handleChatbotChange}
        >
          <MenuItem value="fe4fa6cb-b1b8-433d-9637-d099c59ef15a">Recipe</MenuItem>
          <MenuItem value="another-chatbot-id">Agility LLM </MenuItem>
          {/* Add more chatbots as needed */}
        </Select>
      </ChatbotSelector>
      <ChatContainer elevation={3}>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.sender === 'user'}>
              <MessageBubble isUser={msg.sender === 'user'}>
                {msg.text}
              </MessageBubble>
            </Message>
          ))}
          {loading && (
            <Message isUser={false}>
              <MessageBubble isUser={false}>
                <CircularProgress size={20} />
              </MessageBubble>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </Button>
        </Box>
      </ChatContainer>
    </Box>
  );
};

export default ProtectedPage;
