const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors'); // handles async errors automatically

// Load environment variables
dotenv.config();

// Import DB connection
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' })); // parse JSON body
app.use(cors()); // enable CORS for frontend
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // request logger
}

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const standardRoutes = require('./src/routes/standardRoutes');
const comparisonRoutes = require('./src/routes/comparisonRoutes');
const processRoutes = require('./src/routes/processRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/standards', standardRoutes);
app.use('/api/comparisons', comparisonRoutes);
app.use('/api/processes', processRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Project Management Comparator Backend Running 🚀' });
});

// Error Handler Middleware (must be last)
const { errorHandler } = require('./src/middleware/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
