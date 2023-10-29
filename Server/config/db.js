const mysql = require('mysql2/promise')

// Replace these with your MySQL server credentials
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DB,
  });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//       }
//       console.log('Connected to MySQL server');
// })

module.exports = pool