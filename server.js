const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// ✅ Home route (loads index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ✅ Contact API
app.post('/api/contact', (req, res) => {
  console.log("📩 Incoming Data:", req.body);

  const { fname, lname, email, budget, message } = req.body;

  if (!fname || !lname || !email || !message) {
    return res.status(400).send('❌ Please fill all required fields');
  }

  const sql = `
    INSERT INTO contacts (fname, lname, email, budget, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [fname, lname, email, budget, message], (err, result) => {
    if (err) {
      console.log("❌ DB ERROR:", err);
      return res.status(500).send('❌ Error saving data');
    }

    console.log("✅ Data inserted ID:", result.insertId);
    res.send('✅ Message sent successfully!');
  });
});

// ✅ IMPORTANT: Railway PORT fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});