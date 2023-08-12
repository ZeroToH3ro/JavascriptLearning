const {DataTypes} = require("sequelize");
const sequelize = require("../util/database");

const Comments = sequelize.define("Comment", {
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Comments;
