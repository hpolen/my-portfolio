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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Styled Components for Chat Interface
const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 1200, // Increased maxWidth for better layout
  margin: 'auto',
  height: '80vh', // Increased height for more chat space
  display: 'flex',
  flexDirection: 'column',
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Space between title and selector
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const ChatbotSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
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
  wordBreak: 'break-word', // Ensure long words break properly
}));

// Updated query function to accept chatbotId
async function query(chatbotId, data) {
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

const ProtectedPage = () => {
  // Define chatbots with their respective IDs and names
  const chatbots = {
    "15e30afb-588e-49c3-bdb0-ea988244d8a0": "Recipe",
    "d235ab93-1192-41fd-9b9f-aea2361dc4e6": "Harry Polen LLM"
  };

  // State for chat history
  const [messages, setMessages] = useState([]);
  // State for user input
  const [input, setInput] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);
  // State for selected chatbot (if multiple)
  const [selectedChatbot, setSelectedChatbot] = useState('15e30afb-588e-49c3-bdb0-ea988244d8a0'); // Default to Recipe

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
      // Query the Flowise backend with the selected chatbot
      const response = await query(selectedChatbot, { question: input });

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

      <ChatContainer elevation={3}>
        {/* Header: Chatbot Tester and Selector */}
        <HeaderContainer>
          <Title variant="h4">
            Chatbot Tester
          </Title>
          {/* Chatbot Selector */}
          <ChatbotSelector>
            <InputLabel id="chatbot-selector-label">Select Chatbot</InputLabel>
            <Select
              labelId="chatbot-selector-label"
              id="chatbot-selector"
              value={selectedChatbot}
              label="Select Chatbot"
              onChange={handleChatbotChange}
            >
              {Object.entries(chatbots).map(([id, name]) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </ChatbotSelector>
        </HeaderContainer>

        {/* Messages Container */}
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.sender === 'user'}>
              <MessageBubble isUser={msg.sender === 'user'}>
                {msg.sender === 'bot' ? (
                  // Render formatted bot messages
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  // Render user messages as plain text
                  msg.text
                )}
              </MessageBubble>
            </Message>
          ))}
          {loading && (
            <Message isUser={false}>
              <MessageBubble isUser={false}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="textSecondary">
                    Bot is typing...
                  </Typography>
                </Box>
              </MessageBubble>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        {/* Input Area */}
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
            aria-label="Type your message"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={loading}
            aria-label="Send Message"
          >
            Send
          </Button>
        </Box>
      </ChatContainer>
    </Box>
  );
};

export default ProtectedPage;
