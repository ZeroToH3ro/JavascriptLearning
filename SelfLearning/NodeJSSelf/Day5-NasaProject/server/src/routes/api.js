const express = require('express');

const api = express.Router();
const launchesRouter = require("./launches/launches.router");
const planetRouters = require("./planets/planets.router");

api.use('/launches', launchesRouter);
api.use('/planets', planetRouters);

module.exports = api;