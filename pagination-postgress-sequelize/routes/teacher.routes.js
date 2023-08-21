const express = require('express');
const router = express.Router();

const {
    createTeacher,
    findAllTeachers,
    deleteOneTeacher,
    updateTeacher,
    findOneTeacher,
    findAllTeacherByAge,
    getTeacherWithTutorialsById,
    insertManyTutorialsIntoOneTeacher
} = require('../controllers/teacher.controllers');

router.post("/teacher", createTeacher);
router.get("/teacher", findAllTeachers);
router.get("/teacher/age", findAllTeacherByAge);
router.get("/teacher/:id", findOneTeacher);
router.get("/teacher/with-tutorials/:id", getTeacherWithTutorialsById);
router.put("/teacher/:id", updateTeacher);
router.delete("/teacher/:id", deleteOneTeacher);
router.post("/teacher/associate-tutorials/:id", insertManyTutorialsIntoOneTeacher);

module.exports = router;
