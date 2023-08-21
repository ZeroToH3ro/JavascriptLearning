const { options } = require('pg/lib/defaults');
const sequelize = require('../services/database');
const {DataTypes, Sequelize} = require('sequelize');

const Tutorial = sequelize.define('Tutorial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN
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


// Define hooks to update the updatedDate field before updating
Tutorial.addHook('beforeUpdate', (instance, options) => {
    instance['updatedDate'] = new Date();
});

module.exports = Tutorial;

