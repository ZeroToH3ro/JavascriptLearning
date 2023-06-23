const express = require('express');
const messageController = require('../controllers/message.controller');
const messageRouter = express.Router();

messageRouter.use((req, res, next) => {
    console.log("IP address: ", req.ip);
    next();
});
messageRouter.get('/', messageController.getMessage);
messageRouter.post('/', messageController.postMessage);

module.exports = messageRouter;