const express = require('express');
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const initWebRouter = require('./router/web');

const app = express();
const port = 3000;

try {
    db.authenticate().then(() => console.log('Connection has been established successfully.'));
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

initWebRouter(app);


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})
