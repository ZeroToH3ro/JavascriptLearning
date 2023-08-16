const express = require('express');
const viewEngine = require('../config/viewEngine.config');
const sequelize = require('./utils/database');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8081;

viewEngine.configViewEngine(app);

const sync = async() => await sequelize.sync();
sync().then(() => console.log('Database is sync'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
