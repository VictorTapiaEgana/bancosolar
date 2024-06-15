const Pool = require('pg-pool');

const config = {
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT
};

const pool = new Pool (config);

module.exports = pool;