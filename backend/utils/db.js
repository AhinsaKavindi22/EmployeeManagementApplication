 // db.js
 import mysql from 'mysql2';

 const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'Ahinsa#20',
     database: 'emu',
 });

 db.connect((err) => {
     if (err) {
         console.error('Error connecting to MySQL database: ', err);
         return;
     }
     console.log('Connected to MySQL database!');
 });

 export default db; // Keep default export for consistency