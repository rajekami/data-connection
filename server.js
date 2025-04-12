const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL cloud connection (Render DB)
const pool = new Pool({
  connectionString: 'postgresql://data_connection_db_user:fEEtuiKIlnt8AXGA1Y84pchZUwxOxDGb@dpg-cvtb9kbe5dus73a693h0-a/data_connection_db',
  ssl: {
    rejectUnauthorized: false
  }
});

// API endpoint for dropdown options
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

// Start the server
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});