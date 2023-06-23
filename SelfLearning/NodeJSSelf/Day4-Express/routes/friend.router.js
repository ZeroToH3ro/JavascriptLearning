const express = require('express');
const friendController = require('../controllers/friend.controller');
const friendRouter = express.Router();
//Set middle-ware
friendRouter.use((req, res, next) => {
    console.log('Ip Address: ', req.ip);
    next();
});

friendRouter.get("/", friendController.getFriend);
friendRouter.post("/", friendController.postFriend);
friendRouter.get("/:friendID", friendController.getDetailFriend);

module.exports = friendRouter;