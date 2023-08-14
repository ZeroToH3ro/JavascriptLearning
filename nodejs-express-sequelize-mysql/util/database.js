const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("mother-app", "root", "minh21052002@@", {
    dialect: "mysql",
    host: "localhost"
});

const checkConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log("DB is connected, let check your database in local");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

checkConnection();

module.exports = sequelize;
