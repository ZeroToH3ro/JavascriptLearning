import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./router/web"
import connectDB from "./config/connectDB"
require('dotenv').config();

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


connectDB().then(r => console.log("Connect Database Success"));
configViewEngine(app);
initWebRouter(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is open at http://localhost:${port} `)
})
