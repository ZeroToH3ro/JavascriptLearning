const http = require("http");
const app = require("./app");

const MONGO_URL = "mongodb+srv://mtblaser2002:minh21052002@nasacluster.j6gkzds.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const { error } = require("console");
const { mongoConnect } = require('./services/mongo');

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

startServer();

