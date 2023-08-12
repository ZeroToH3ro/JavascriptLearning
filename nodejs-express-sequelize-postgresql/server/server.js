const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');
db.sequelize.sync();

const app = express();
const corsOption = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOption));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//simple routes
app.get('/', (req, res) => {
    res.json('Welcome to my program')
});

require("./routes/tutorial.routes")(app);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
