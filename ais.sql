CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Unique user ID
    name VARCHAR(100) NOT NULL, -- User's full name
    email VARCHAR(100) UNIQUE NOT NULL, -- User's email
    password TEXT NOT NULL -- Encrypted password
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY, -- Unique car ID
    user_id INT NOT NULL, -- Owner of the car (link to users table)
    make VARCHAR(100) NOT NULL, -- Car manufacturer (e.g., Toyota)
    model VARCHAR(100) NOT NULL, -- Car model (e.g., Corolla)
    year INT NOT NULL, -- Year of manufacture
    price DECIMAL(10, 2) NOT NULL, -- Price in dollars
    available BOOLEAN DEFAULT TRUE -- Whether the car is available
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY, -- Unique transaction ID
    user_id INT NOT NULL, -- User who made the transaction
    car_id INT NOT NULL, -- Car involved in the transaction
    type VARCHAR(50) NOT NULL, -- Type (e.g., "Sold", "Rented")
    amount DECIMAL(10, 2) NOT NULL, -- Sale or rental amount
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date and time of transaction
);
