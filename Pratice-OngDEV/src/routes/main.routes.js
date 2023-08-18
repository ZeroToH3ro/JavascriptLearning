const express = require('express');
const router = express.Router();
const {upload, uploadMultipleFiles} = require('../utils/handleImage');
const multer = require('multer');

const {
    getHomePage,
    getDetailUser,
    createUser,
    deleteUser,
    getEditUser,
    updateUser,
    getCreateUser,
    getUploadFile,
    uploadMultiFiles
} = require('../controllers/user.controllers');

router.get('', getHomePage);
router.get('/detail-user/:id', getDetailUser);
router.post('/create-new-user', createUser);
router.post('/delete-user', deleteUser);
router.get('/edit-user/:id', getEditUser);
router.post('/update-user', updateUser);
router.get('/create-user', getCreateUser);
router.get('/upload', getUploadFile);
router.post('/upload-profile-pic', upload.single('profile_pic'), getUploadFile);
router.post('/upload-multiple-images', (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
            // handle multer file limit error here
            res.send('LIMIT_UNEXPECTED_FILE');
        } else if (err) {
            res.send(err);
        }
        else {
            // make sure to call next() if all was well
            next();
        }
    })
}, uploadMultiFiles);

module.exports = router;
