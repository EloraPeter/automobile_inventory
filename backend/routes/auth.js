const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'Signup successful. Please log in.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

//admin
//fetch all users
// app.get("/api/admin/users", authenticateToken, async (req, res) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ error: "Access denied." });
//     }

//     try {
//         const result = await pool.query("SELECT id, first_name, last_name, email, role FROM users");
//         res.json(result.rows);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching users." });
//     }
// });

//fetch all data
// app.delete("/api/admin/users/:id", authenticateToken, async (req, res) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ error: "Access denied." });
//     }

//     try {
//         const { id } = req.params;
//         await pool.query("DELETE FROM users WHERE id = $1", [id]);
//         res.json({ message: "User deleted successfully." });
//     } catch (error) {
//         res.status(500).json({ error: "Error deleting user." });
//     }
// });



module.exports = router;
