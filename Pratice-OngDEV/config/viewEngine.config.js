const express = require('express');

module.exports.configViewEngine = (app) => {
    app.use(express.static('./public'));

    app.set("view engine", "ejs");
    app.set("views", "./views");
};
