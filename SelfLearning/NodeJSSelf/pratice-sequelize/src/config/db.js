const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('nodejs', 'zero', 'minh21052002@@');

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = {
    testDbConnection
}
