const { options } = require('pg/lib/defaults');
const sequelize = require('../services/database');
const {DataTypes, Sequelize} = require('sequelize');

const Teacher = sequelize.define('Teacher', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement  : true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

Teacher.addHook('beforeUpdate', (instance, options) => {
    instance['updatedDate'] = new Date(); 
});

module.exports = Teacher