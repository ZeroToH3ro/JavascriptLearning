const express = require("express");
const db = require("./db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//handle middleware
app.use((req, res, next) => {
  console.log("This is middleware");
  next();
});
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id;"
    );
    res.status(200).json({
      status: "success",
      result: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (e) {
    console.log("Error", e);
  }
});
//get detail restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await db.query(
      "select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    console.log("Value from db: ", result);
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    console.log("Reviews from db: ", reviews);
    res.status(200).json({
      status: "success",
      restaurant: result.rows[0],
      reviews: reviews.rows,
    });
  } catch (e) {
    console.log("Error: ", e);
  }
});

//create restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurant(name, location, price_range) VALUES($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (e) {
    console.log(e);
  }
});

//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurant SET name = $1, location = $2, price_range = $3  WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      restaurant: results.rows[0],
    });
  } catch (e) {
    console.log(e);
  }
});
//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM restaurant WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);

    res.status(200).json({
      status: "create a new review success",
      review: newReview.rows[0],
    });
  } catch (e) {
    console.log(e);
  }
});
app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
