const express = require('express');
const sequelize = require('./src/utils/database');
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8081;
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
};
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));
//Using Json
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
//Config View Engine
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");
//Handle cors
app.use(cors(corsOptions));
//Mounting route
app.use('/', require('./src/routes/main.routes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
