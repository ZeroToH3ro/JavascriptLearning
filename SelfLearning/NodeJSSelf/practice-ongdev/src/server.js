const express = require("express");
const app = express();
const morgan = require('morgan');
const initWebRouter = require('./routes/web');
const configViewEngine = require('./configs/viewEngine');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;
//handle middleware
app.use((req, res, next) => {
    console.log("Run into method:");
    console.log(req.method);
    next();
})
app.use(morgan("combine"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//init web router
initWebRouter(app);
//config view engine
configViewEngine(app);

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
})

