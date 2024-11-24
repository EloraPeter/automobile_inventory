const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();

app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/auth', authRoutes); // Handles signup/login
app.use('/api/inventory', inventoryRoutes); // Handles automobile inventory

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
