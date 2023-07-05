const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log("Creating connection pool...");

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
