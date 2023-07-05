const express = require('express');
const configViewEngine = require('./config/viewEngine');
const initWebRouter = require('./router/web');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
//handle middleware
app.use((req, res, next) => {
    console.log("This is our middleware");
    next();
})
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

configViewEngine(app);
initWebRouter(app);

app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
})
