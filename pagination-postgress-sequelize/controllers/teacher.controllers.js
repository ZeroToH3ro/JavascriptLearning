const { Op } = require('sequelize');
const Teacher = require('../models/Teacher');
const Tutorial = require('../models/Tutorial');
const TeacherTutorial = require('../server');

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: teacher } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, teacher, totalPages, currentPage };
}

const createTeacher = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.age) {
        return res.status(400).json({
            message: 'Missing Fields '
        });
    }

    const teacher = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

    await Teacher.create(teacher)
        .then(data => res.status(201).json({
            message: "Create Teacher Success",
            data
        }))
        .catch((err) => {
            message: "Internal Server Error",
                err
        });
};

const findAllTeachers = async (req, res) => {
    const { page, size, name } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    try {
        await Teacher.findAndCountAll({ where: condition, limit, offset }).then(
            (data) => {
                const response = getPagingData(data, page, limit);
                return res.status(200).json({
                    message: 'Find All Tutorials Success',
                    response
                });
            }
        )
    } catch (err) {
        console.log(err);
    }
};

const findAllTeacherByAge = async (req, res) => {
    const { page, size, number } = req.query;
    const { limit, offset } = getPagination(page, size);

    await Teacher.findAndCountAll({
        where: {
            age: {
                [Op.gte]: `${number}`
            }
        },
        limit,
        offset
    }).then((data) => {
        const response = getPagingData(data, page, limit);
        return res.status(200).json({
            message: 'Success Get Data By Age',
            response
        })
    }).catch((err) => {
        return res.status(500).json({
            message: "Error Retrieving Teacher By Age",
            err
        })
    });
};

const getTeacherWithTutorialsById = async (req, res) => {
    const teacherId = req.params.id;

    if (!teacherId) {
        return res.status(404).json({
            message: 'Id is empty'
        })
    }

    try {
        const teacher = await Teacher.findOne({
            where: { id: teacherId },
            include: [
                {
                    model: Tutorial,
                    attributes: ['id', 'title', 'description', 'published'],
                    through: { attributes: [] }
                }
            ]
        })
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        return res.status(200).json({ teacher });

    } catch (error) {
        console.log(error);
    }
}

const findOneTeacher = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: 'Id is empty'
        });
    }

    await Teacher.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

const deleteOneTeacher = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: 'Id Is Empty'
        });
    }

    await Teacher.destroy({
        where: { id: id }
    }).then((number) => {
        if (number == 1) {
            return res.status(200).json({
                message: 'Delete Teacher By Id Success'
            });
        } else {
            return res.status(404).json({
                message: `Can't Delete Teacher With ID ${id}, maybe teacher not found`
            });
        }
    }).catch(err =>
        res.status(500).json({
            message: 'Could Not Delete Teacher',
            err
        })
    );
};

const updateTeacher = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: 'Id Is Empty'
        });
    }

    await Teacher.update(req.body, { where: { id: id } }).then(number => {
        if (number == 1) {
            return res.status(200).json({
                message: 'Update Teacher Success'
            });
        } else {
            return res.status(404).json({
                message: `Can't Update Teacher With ID=${id}. Maybe Teacher Not Found!`
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Could not Update Tutorial with id=" + id,
            err
        })
    })
};

const insertManyTutorialsIntoOneTeacher = async (req, res) => {
    const teacherId = req.params.id;
    const tutorialIdString = req.body.tutorialId;
    const tutorialId = tutorialIdString.map(str => parseInt(str, 10));

    try {
        const teacher = await Teacher.findByPk(teacherId);

        if (!teacher) {
            //check if the tutorials are already in this teacher's list of tutorials
            return res.status(404).json({
                message: 'Not Found This Teacher'
            });
        }

        const tutorials = await Tutorial.findAll(
            {
                where: {
                    id: tutorialId
                }
            }
        );
        console.log('Tutorials:', JSON.stringify(tutorials));

        if (tutorials.length !== tutorialId.length) {
            return res.status(404).json({ message: 'One or more tutorials not found' });
        }

        // Create an array of objects to insert into TeacherTutorials
        const teacherTutorialsData = tutorialId.map(tutorialId => {
            return {
                teacherId: teacher.id, // Use the teacher's ID
                tutorialId: tutorialId
            };
        });
        
        const insertedRows = await TeacherTutorial.bulkCreate(teacherTutorialsData, {
            returning: ['teacherId', 'tutorialId', 'createdAt', 'updatedAt']
        });

        console.log('Inserted rows:', insertedRows);

        console.log('After Adding Tutorial');
        return res.status(201).json({ message: 'Tutorials associated successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createTeacher,
    findAllTeachers,
    findOneTeacher,
    deleteOneTeacher,
    updateTeacher,
    findAllTeacherByAge,
    getTeacherWithTutorialsById,
    insertManyTutorialsIntoOneTeacher
}