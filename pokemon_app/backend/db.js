const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pokemon',
  password: 'PerCh21@458',
  port: 5432,
});

module.exports = pool;
