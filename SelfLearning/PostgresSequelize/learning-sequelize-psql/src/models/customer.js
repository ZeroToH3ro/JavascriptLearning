const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Customer = db.define('Customer', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

Customer.sync().then(() => {
    console.log('table created');
});
// `sequelize.define` also returns the model
console.log("Model is created: ", Customer === db.models.Customer); // true

module.exports = Customer
