// server/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic endpoint to test the server
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Import routes
const messagesRoute = require('./routes/messages');
const chatRoute = require('./routes/chat');
const actionsRoute = require('./routes/actions');

// Use routes
app.use('/api/messages', messagesRoute);
app.use('/api/chat', chatRoute);
app.use('/api/actions', actionsRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
