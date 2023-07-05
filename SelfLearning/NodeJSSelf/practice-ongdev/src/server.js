const express = require("express");
const app = express();
const morgan = require('morgan');
const initWebRouter = require('./routes/web');
const configViewEngine = require('./configs/viewEngine');
const dotenv = require('dotenv');
const path = require("path");
dotenv.config();
const port = process.env.PORT || 8080;
//handle middleware
app.use((req, res, next) => {
    console.log("Run into method:");
    console.log(req.method);
    next();
})
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//config view engine
configViewEngine(app);
//init web router
initWebRouter(app);

app.use((req, res) => {
    res.render("404.ejs");
})

app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
})

