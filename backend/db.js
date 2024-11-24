const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'new_automobile',
    password: '032005',
    port: 5432,
});

module.exports = pool;
