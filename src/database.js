require('dotenv').config()
const mysql = require('mysql');
const {promisify} = require('util');

// const pool = mysql.createPool(process.env.DATABASE);
const pool = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

pool.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});

//! Convertir callbacks a promesas
pool.query = promisify(pool.query);

module.exports = pool;