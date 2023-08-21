const express = require('express');
const router = express.Router();

const {
    createTutorial,
    findAllTutorials,
    findOneTutorial,
    findAllTutorialsPublished,
    deleteOneTutorial,
    updateTutorial
} = require('../controllers/tutorial.controllers');

// Create a new Tutorial
router.post("/tutorial", createTutorial);

// Retrieve all Tutorials
router.get("/tutorial", findAllTutorials);

// Retrieve all published Tutorials
router.get("/tutorial/published", findAllTutorialsPublished);

// Retrieve a single Tutorial with id
router.get("/tutorial/:id", findOneTutorial);

// Update a Tutorial with id
router.put("/tutorial/:id", updateTutorial);

// Delete a Tutorial with id
router.delete("/tutorial/:id", deleteOneTutorial);



module.exports = router;