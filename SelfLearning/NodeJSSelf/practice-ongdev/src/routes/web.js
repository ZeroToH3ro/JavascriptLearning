const express = require('express');
const path = require('path');
const { getHomePages, detailPage, createNewUser} = require('../controllers/home.controller');

let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', getHomePages);
    router.get('/detail-user/:id', detailPage);
    router.post('/create-user', createNewUser);

    return app.use('/', router);
}

module.exports = initWebRouter;
