const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {errorHandler} = require("./middlewares/errorHandler");
const tutorialRouter = require("./routes/tutorial.routes");

require("dotenv").config();
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8081;
const corsOptions = {
    option: "http://localhost:8081",
    credentials: true
};

const db = require("./models/index");
db.sequelize.sync().then(() => console.log('DB is connected')).catch((err) => console.log(err));

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(errorHandler);
app.use(cors(corsOptions));
app.use('/api/tutorials',tutorialRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
