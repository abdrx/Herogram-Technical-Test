const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node',
  password: 'admin12A3',
  port: 5432,
});

pool.connect()
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.error('DB connection failed:', err.message));

module.exports = pool;
