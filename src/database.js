require('dotenv').config()
const mysql = require('mysql');
const {promisify} = require('util');

// const pool = mysql.createPool(process.env.DATABASE);
const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
    database: process.env.database
})

pool.getConnection((err, connection) => {
    if (err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if (connection) connection.release();
    console.log('DB is connected');
    return
});

//! Convertir callbacks a promesas
pool.query = promisify(pool.query);

module.exports = pool;