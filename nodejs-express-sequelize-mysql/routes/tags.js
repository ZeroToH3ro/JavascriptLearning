const express = require("express");
const router = express.Router();

const {getTags} = require("../controllers/tags");

router.get("/tags/").get(getTags);

module.exports = router;