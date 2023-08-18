const {Sequelize} = require("sequelize");
const dbConfig = require('../../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const connectDB = async () => {
    try{
        await sequelize.authenticate();
    } catch (e){
        console.log(e);
    }
}

connectDB().then(() => console.log('DB is connect'));

module.exports = sequelize;

