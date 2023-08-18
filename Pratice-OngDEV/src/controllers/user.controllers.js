const sequelize = require("../utils/database");
const User = require("../models/User");

const getHomePage = async (req, res) => {
    try {
        const local = {
            title: "Home Page",
        };

        const {count, rows} = await User.findAndCountAll({
            offset: 0,
            limit: 10,
            distinct: true,
            order: [["createdAt", "DESC"]]
        });

        let countUser = count;
        let page = req.query.page || 1;
        let nextPage = parseInt(page) + 1;
        const perPage = 10;
        let hasNextPage = Math.ceil(countUser / perPage);

        return res.render('index.ejs', {
            dataUser: rows,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            local
        });
    } catch (err) {
        console.log(err);
    }
};

const getDetailUser = async (req, res) => {
    const local = {
        title: "Detail User",
    };
    const id = req.params.id;
    if (!id) {
        res.status(404).json({
            message: "Not found this user"
        })
    }
    //! Fetch user detail and return this is by json
    const user = await User.findByPk(id);
    console.log(JSON.stringify(user));
    return res.render('detail.ejs', {user, local});
};

const getCreateUser = (req, res) => {
    //Fill this request for creating new User
    const local = {
        title: "Add User",
    };

    res.render('add.ejs', {local});
};
const createUser = async (req, res) => {
    //Fill this request for creating new User
    try {

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            address: req.body.address
        });
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({
                message: 'User not found'
            })
        }
        const user = await User.findOne({
            where: {id: userId}
        });

        await user.destroy();
    } catch (err) {
        console.log(err);
    }
};

const getEditUser = async (req, res) => {
    const local = {
        title: "Edit User",
    };
    const id = req.params.id;
    const user = await User.findByPk(id);
    return res.render('update.ejs', {dataUser: user, local});
};

const updateUser = async (req, res) => {
    const {username, email, address, id} = req.body;

    try {
        const user = await User.update(
            {
                username: username,
                email: email,
                address: address
            },
            {
                where: {id: id},
            }
        ).then(() => console.log('Update user success'));
    } catch (e) {
        console.log(e);
    }
};

const getUploadFile = (req, res) => {
    const local = {
        title: "Upload File",
    };

    return res.render('upLoadFile.ejs', {local});
};

const uploadSingleFile = (req, res) => {
    if(req.fileValidationError){
        res.send(req.fileValidationError);
    } else if (!req.file){
        res.send('Please select an image to upload');
    }

    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
};

const uploadMultiFiles = async (req, res) => {
    if(req.fileValidationError){
        res.send(req.fileValidationError);
    } else {
        res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.file;
    let index, len;

    for(index=0, len=files.length; index<len; index++){
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }

    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomePage,
    getDetailUser,
    createUser,
    deleteUser,
    getEditUser,
    updateUser,
    getCreateUser,
    getUploadFile,
    uploadSingleFile,
    uploadMultiFiles
}
