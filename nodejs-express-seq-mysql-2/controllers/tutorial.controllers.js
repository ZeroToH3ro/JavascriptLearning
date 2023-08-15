const db = require("../models");
const Tutorial = db.tutorial;
const {Op} = require('sequelize');
const ErrorResponse = require("../utils/errorResponse");
/*
    Inside app/controllers folder, let’s create tutorial.controller.js with these CRUD functions:
    create
    findAll
    findOne
    update
    delete
    deleteAll
    findAllPublished
*/
const fieldValidation = (field, next) => {
    if (!field) {
        next(new ErrorResponse('Missing field', 400));
    }
}

const createTutorial = async (req, res, next) => {
    //Check valid field
    fieldValidation(req.body.title, next);
    fieldValidation(req.body.description, next);
    //Create an object with 3 fields require for tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    await Tutorial.create(tutorial).then(
        (data) => {
            res.status(200).json({
                message: "Create Tutorial Success",
                data
            })
        }
    );
};

const findAllTutorials = async (req, res) => {
    const title = req.query.title;
    //create condition using Op
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    await Tutorial.findAll({where: condition}).then(
        (data) => {
            res.status(200).json({
                message: "Find All Tutorials Success",
                data
            })
        }
    );
};

const findOneTutorial = async (req, res) => {
    const id = req.params.id;

    await Tutorial.findByPk(id).then((data) => {
        res.status(200).json({
            message: "Find One Tutorial Success",
            data
        })
    });
};

const updateTutorial = async (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

const deleteTutorial = async (req, res) => {
    const id = req.params.id;

    await Tutorial.destroy({where: {id: id}}).then((data) => {
        res.status(200).json({
            message: "Delete Tutorial Success",
            data
        })
    })
};

const deleteAllTutorials = async (req, res) => {
    await Tutorial.destroy({
        where: {},
        truncate: false
    }).then((data) => {
        res.status(200).json({
            message: "Delete All Tutorial Success",
            data
        })
    })
};

const findAllPublishedTutorials = async (req, res) => {
    await Tutorial.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


module.exports = {
    createTutorial,
    findAllTutorials,
    findOneTutorial,
    updateTutorial,
    deleteTutorial,
    deleteAllTutorials,
    findAllPublishedTutorials
}
