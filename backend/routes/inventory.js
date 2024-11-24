const express = require('express');
const pool = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify token
function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Get inventory
router.get('/', authenticate, async (req, res) => {
    try {
        const cars = await pool.query('SELECT * FROM cars WHERE user_id = $1', [req.userId]);
        res.json(cars.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add car
router.post('/add', authenticate, async (req, res) => {
    const { make, model, year, price } = req.body;

    try {
        await pool.query(
            'INSERT INTO cars (user_id, make, model, year, price) VALUES ($1, $2, $3, $4, $5)',
            [req.userId, make, model, year, price]
        );

        res.status(201).json({ message: 'Car added successfully.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


//search bar
// let inventoryCache = []; // Cache inventory for efficient filtering

// // Fetch inventory and store it in cache
// async function fetchAndCacheInventory() {
//     const response = await fetch(`${API_BASE}/inventory`);
//     inventoryCache = await response.json();
//     renderInventory(inventoryCache);
// }

// // Render inventory table
// function renderInventory(cars) {
//     const table = document.getElementById("inventory-table");
//     table.innerHTML = "";

//     cars.forEach((car) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${car.make}</td>
//             <td>${car.model}</td>
//             <td>${car.year}</td>
//             <td>${car.price}</td>
//             <td>${car.available ? "Yes" : "No"}</td>
//         `;
//         table.appendChild(row);
//     });
// }

// // Filter inventory based on search input
// function filterInventory() {
//     const searchValue = document.getElementById("search-bar").value.toLowerCase();
//     const filteredCars = inventoryCache.filter(
//         (car) =>
//             car.make.toLowerCase().includes(searchValue) ||
//             car.model.toLowerCase().includes(searchValue)
//     );
//     renderInventory(filteredCars);
// }

// // Initialize inventory
// fetchAndCacheInventory();


module.exports = router;
