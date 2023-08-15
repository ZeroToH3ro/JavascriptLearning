const tutorials = require("../controllers/tutorial.controllers");
const router = require("express").Router();
// Create a new Tutorial
router.post("/", tutorials.createTutorial);

// Retrieve all Tutorials
router.get("/", tutorials.findAllTutorials);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublishedTutorials);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOneTutorial);

// Update a Tutorial with id
router.put("/:id", tutorials.updateTutorial);

// Delete a Tutorial with id
router.delete("/:id", tutorials.deleteTutorial);

// Delete all Tutorials
router.delete("/", tutorials.deleteAllTutorials);

module.exports = router;
