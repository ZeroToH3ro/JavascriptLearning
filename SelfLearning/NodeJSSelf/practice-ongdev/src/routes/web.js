const express = require('express');
const path = require('path');
const multer = require('multer');
const appRoot = require('app-root-path');
const { getHomePages, detailPage, createNewUser, editUser, deleteUser,  uploadFilePage, handleUploadFile} = require('../controllers/home.controller');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

// let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRouter = (app) => {
    router.get('/', getHomePages);
    router.get('/detail-user/:id', detailPage);
    router.post('/create-new-user', createNewUser);
    router.post('/edit-user/:id', editUser);
    router.post('/delete-user/:id', deleteUser);

    router.get('/upload', uploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), handleUploadFile)
    return app.use('/', router);
}

module.exports = initWebRouter;
