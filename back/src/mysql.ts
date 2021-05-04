import mysql from 'mysql';
import config from './config';

const pool = mysql.createPool({
    host     : config.api.HOST,
    user     : config.database.USER,
    password : config.database.PASSWORD,
    database : config.database.NAME
});

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) connection.release();
    return;
});

export default pool;
