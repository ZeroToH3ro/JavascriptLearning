const {Sequelize} = require("sequelize");

module.exports = new Sequelize('nodejs', 'zero', 'minh21052002@@', {
    host: 'localhost',
    dialect: 'postgres'
});


