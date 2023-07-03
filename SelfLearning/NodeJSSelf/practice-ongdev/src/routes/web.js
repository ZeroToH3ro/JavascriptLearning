const express = require('express');
const path = require('path');
const { getHomePages } = require('../controllers/home.controller');

let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', getHomePages);

    return app.use('/', router);
}

module.exports = initWebRouter;
