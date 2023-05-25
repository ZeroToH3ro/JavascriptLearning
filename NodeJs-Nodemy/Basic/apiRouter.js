const express = require("express");

var router = express.Router();

router.get('/api1/v1', function (req, res) {
    res.json('Router 1 user');
})

router.get('/api1/v1/:id', function (req, res) {
    res.json('Router 1 user: ' + req.params.id);
})

router.get('/api1/v1/cart', function (req, res) {
    res.json('Router 1 cart');
})

router.get('/api1/v1/product', function (req, res) {
    res.json('Router 1 product');
})

module.exports = router;