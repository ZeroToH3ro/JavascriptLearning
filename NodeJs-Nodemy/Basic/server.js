const express = require('express');
//Declare App use Express
var app = express();
//Declare Router
var router = require('./apiRouter.js');

const port = 8080;


app.use('/', router);

app.listen(port, () => {
    console.log('Server is running on port 8080');
})

