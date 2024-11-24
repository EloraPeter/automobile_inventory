//server.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = '0987654321';

// Set up CORS and JSON middleware
app.use(cors());
app.use(express.json());
// In server.js, add this to serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'automobile_inventory')));


// Database connection
const pool = new Pool({
  user: 'postgres',          // Replace with your DB username
  host: 'localhost',
  database: 'automobile_inventory', // Replace with your DB name
  password: '032005',   // Replace with your DB password
  port: 5432,
});


// Signup Route
app.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email is already registered
    const existingUser = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, hashedPassword]
    );

    const newUser = result.rows[0]; // Getting the inserted user data

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.customer_id, email: newUser.email }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );

    // Send the response with the token and redirect info
    res.status(201).json({
      message: 'User created successfully',
      token,
      redirect: '/login'
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// app.post('/signup', async (req, res) => {
//     try {
//       const { first_name, last_name, email, password } = req.body;

//       // Validate input
//       if (!first_name || !last_name || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//       }

//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Insert the new user into the database
//       const result = await pool.query(
//         'INSERT INTO customer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
//         [first_name, last_name, email, hashedPassword]
//       );
//       const newUser = result.rows[0];

//       // Redirect to the login page after successful signup
//       res.redirect('http://127.0.0.1:5500/login');  // You can change this URL to wherever you want the user to go next
//     } catch (error) {
//       console.error("Signup error:", error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });


// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ customer_id: user.customer_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//dashboard route
app.get('/dashboard', verifyJWT, (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
    // res.json({ message: 'Welcome to the dashboard!' });
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({ error: "Server error" });
  }
})


// Middleware to authenticate JWT token
function verifyJWT(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
}





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
