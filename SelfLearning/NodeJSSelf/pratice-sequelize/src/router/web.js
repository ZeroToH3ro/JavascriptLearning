const express = require('express');
const { getCRUD } = require('../controllers/home.controller');
const router = express.Router();

const initWebRouter = (app) => {
    app.get('/crud', getCRUD);

    return app.use('/', router);
}

module.exports = initWebRouter;
