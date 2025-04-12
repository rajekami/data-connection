const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: 5433
});

app.get('/dropdown-options', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM public.countries ORDER BY id ASC');
    const formatted = result.rows.map(row => ({
      key: row.id,
      value: row.name
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});