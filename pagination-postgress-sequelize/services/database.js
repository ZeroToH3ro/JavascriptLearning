const {Sequelize} = require('sequelize');
const PG_DB='node_sequelize';
const PG_USER='postgres';
const PG_PASS='minh21052002';
const PG_HOST = 'localhost'


const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASS, {
    host: PG_HOST ,
    dialect: 'postgres',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const checkDatabase = async () => {
    try {
        await sequelize.authenticate().then(() => console.log('DB connected'));
    } catch (error) {
        console.log(error);    
    }
};

checkDatabase();

module.exports = sequelize;

