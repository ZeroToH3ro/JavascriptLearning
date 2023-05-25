//User option 2
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:minh21052002@localhost:5432/booking-care');


let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;