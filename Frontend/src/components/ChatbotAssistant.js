// src/components/ChatbotAssistant.js

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Styled Components
const FloatingButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  zIndex: 1000,
}));

const ChatWindow = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(3),
  width: 350,
  maxHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
  boxShadow: theme.shadows[5],
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  overflowY: 'auto',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

// Chatbot Query Function
async function query(data) {
  const chatbotId = "d235ab93-1192-41fd-9b9f-aea2361dc4e6"; // Harry Polen LLM

  const response = await fetch(
    `https://flowise-5ho4.onrender.com/api/v1/prediction/${chatbotId}`,
    {
      headers: {
        Authorization: "Bearer mev--cGvYzvxOEwvdLzO-mDXTq_Eht7LvNYOSL-J26M",
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

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [password, setPassword] = useState(''); // Password input
  const [passwordError, setPasswordError] = useState(''); // Password error message
  const [messages, setMessages] = useState([]); // Chat history
  const [input, setInput] = useState(''); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const messagesEndRef = useRef(null); // Ref to scroll to latest message

  const CORRECT_PASSWORD = "admin123"; // Replace with your desired password or use environment variables

  // Scroll to the latest message whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handler to toggle chat window
  const toggleChat = () => {
    if (isAuthenticated) {
      setIsOpen(!isOpen);
    } else {
      // Open password dialog
      setIsOpen(true);
    }
  };

  // Handler for password submission
  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // Handler for sending messages
  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user's message to chat history
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Query the Flowise backend with the hardcoded chatbot ID
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

      // Add chatbot's response to chat history with formatting
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

  return (
    <>
      {/* Floating Chat Icon */}
      <FloatingButton onClick={toggleChat} aria-label="Open Chatbot">
        {isOpen && isAuthenticated ? <CloseIcon /> : <ChatIcon />}
      </FloatingButton>

      {/* Password Dialog */}
      <Dialog open={isOpen && !isAuthenticated} onClose={() => setIsOpen(false)}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlePasswordSubmit();
              }
            }}
            aria-label="Password"
          />
          {passwordError && <Alert severity="error" sx={{ mt: 2 }}>{passwordError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePasswordSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat Window */}
      {isOpen && isAuthenticated && (
        <ChatWindow elevation={4}>
          {/* Header */}
          <Header>
            <Typography variant="h6">Assistant</Typography>
            <IconButton onClick={toggleChat} color="inherit" aria-label="Close Chatbot">
              <CloseIcon />
            </IconButton>
          </Header>

          {/* Messages */}
          <MessagesContainer>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={
                      msg.sender === 'bot' ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        msg.text
                      )
                    }
                  />
                </ListItem>
              ))}
              {loading && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} />
                        <Typography variant="body2" color="textSecondary">
                          Bot is typing...
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>
          </MessagesContainer>

          {/* Input Field */}
          <InputContainer>
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Type your message"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              disabled={loading}
              aria-label="Send Message"
            >
              <SendIcon />
            </Button>
          </InputContainer>
        </ChatWindow>
      )}
    </>
  );
};

export default ChatbotAssistant;
