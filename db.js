const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'veda',
  database: process.env.DB_NAME || 'portfolio'
});

db.connect(err => {
  if (err) {
    console.log('❌ DB Connection Failed:', err);
  } else {
    console.log('✅ MySQL Connected');
  }
});

module.exports = db;
