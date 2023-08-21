const { Op } = require("sequelize");
const Tutorial = require("../models/Tutorial");

const getPagination = (page, size) => {
    const limit = size ? +size : 3; //the number of object will be displayed
    const offset = page ? page * limit : 0; //the start of object's index will be displayed

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorial } = data; // get data from method findAndCountAll
    const currentPage = page ? +page : 0; // get current page
    const totalPages = Math.ceil(totalItems / limit); //get the number of total pages

    return { totalItems, tutorial, totalPages, currentPage };
};

const createTutorial = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            message: "Missing Fields",
        });
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };

    await Tutorial.create(tutorial)
        .then((data) =>
            res.status(201).json({
                message: "Create Tutorial Success",
                data,
            })
        )
        .catch((err) =>
            res.status(500).json({
                message: "Internal Server Error",
                err,
            })
        );
};

const findAllTutorials = async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);

    let condition = title ? {title: { [Op.like]: `%${title}%` }} : null;

    try {
        await Tutorial.findAndCountAll({where: condition, limit, offset }).then(
            (data) => {
                const response = getPagingData(data, page, limit);
                return res.status(200).json({
                    message: "Find All Tutorials Success",
                    response,
                });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const findOneTutorial = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: 'Id is empty'
        });
    }

    await Tutorial.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

const findAllTutorialsPublished = async (req, res) => {
    let { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    await Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
        .then((data) => {
            const response = getPagingData(data, page, limit);
            return res.status(200).json({
                message: 'Find All Tutorials Published Success',
                response
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Error retrieving Tutorial ",
            })
        });
};

const deleteOneTutorial = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: 'Id is empty'
        });
    }

    await Tutorial.destroy({
        where: {id: id}
    }).then((number) => {
        if(number == 1){
            return res.status(200).json({
                message: 'Delete Tutorial By Id Success'
            });
        } else {
            return res.status(404).json({
                message: `Can't Delete Tutorial With ID=${id}. Maybe Tutorial Not Found!`
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Could not delete Tutorial with id=" + id,
            err
        });
    });
};

const updateTutorial = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: 'Id is empty'
        });
    }

    await Tutorial.update(req.body, {where: {id: id}}).then((number) => {
        if(number == 1){
            return res.status(200).json({
                message: 'Update Tutorial By Id Success'
            });
        } else {
            return res.status(404).json({
                message: `Can't Update Tutorial With ID=${id}. Maybe Tutorial Not Found!`
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Could not Update Tutorial with id=" + id
        });
    });
};


module.exports = {
    createTutorial,
    findAllTutorials,
    findOneTutorial,
    findAllTutorialsPublished,
    deleteOneTutorial,
    updateTutorial
};
