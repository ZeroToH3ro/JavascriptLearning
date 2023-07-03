const express = require("express");
const db = require('./db');
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(morgan("dev"));
app.use(express.json());

//handle middleware
app.use((req, res, next) => {
  console.log("This is middleware");
  next();
});
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try{
    const results = await db.query("SELECT * FROM restaurant");
    console.log("Value from db: ", results);
    res.status(200).json({
      status: "success",
      result: results.rows.length,
      data: [ results.rows ],
    });
  } catch (e) {
    console.log("Error", e);
  }
});
//get detail restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try{
    const results = await db.query('SELECT * FROM restaurant WHERE id = $1', [req.params.id]);
    console.log("Value from db: ", results);
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  }catch (e) {
    console.log("Error: ", e);
  }
});
//create restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try{
    const results = await db.query("INSERT INTO restaurant(name, location, price_range) VALUES($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]);
    console.log(results);
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });

  }catch (e) {
    console.log(e);
  }
});
//update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: "success",
  });
});
//delete restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
