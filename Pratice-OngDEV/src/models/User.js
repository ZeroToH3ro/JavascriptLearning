const {DataTypes} = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
});

module.exports = User;
