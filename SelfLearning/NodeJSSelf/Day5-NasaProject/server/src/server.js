const http = require("http");
const app = require("./app");
const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://mtblaser2002:minh21052002@nasacluster.j6gkzds.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const { error } = require("console");


mongoose.connection.once('open', () => {
  console.log("MongoDb is connected");
})

mongoose.connection.on('error', () => {
  console.error("Connection error: ", error);
})

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

startServer();

