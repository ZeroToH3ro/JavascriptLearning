require('dotenv').config();

module.exports = {
    HOST: process.env.MYSQL_HOST,
    DB: process.env.MYSQL_DB,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
