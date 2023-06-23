const model = require('../models/friend.model');

function getFriend(req, res) {
    res.json(model);
}

function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name failed!!!'
        })
    }

    const newFriend = {
        id: model.length,
        name: req.body.name
    };

    model.push(newFriend);
    res.json(newFriend);
}

function getDetailFriend(req, res) {
    const friendID = req.params.friendID;
    const dataFriend = friends[friendID];

    if (dataFriend) {
        res.status(200).json(dataFriend);
    } else {
        res.status(400).json({
            error: "Data is not available"
        })
    }
}

module.exports = {
    getFriend,
    postFriend,
    getDetailFriend
}