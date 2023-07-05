const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

const initWebRouter = (app) => {
    app.get('/', (req, res) => {
        Customer.findAll().then(customers => {
            console.log(JSON.stringify(customers));
        }).catch(error => {
            console.log(error);
        })
        res.sendStatus(200);
    });
    return app.use('/', router);
}

module.exports = initWebRouter;
