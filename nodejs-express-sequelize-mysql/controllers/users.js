const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");
const {sign} = require("../util/jwt");

const createUser = asyncHandler(async (req, res, next) => {
    const {email, password, username} = req.body.user;
    
    fieldValidation(email, next);
    fieldValidation(password, next);
    fieldValidation(username, next);

    const user = await User.create({
        email,
        password,
        username
    });

    if(user.dataValues.password){
        delete user.dataValues.password;
    }

    user.dataValues.token = await sign(user);
    user.dataValues.bio = null;
    user.dataValues.image = null;

    res.status(200).json({user});
});

const loginUser = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body.user;

    fieldValidation(email, next);
    fieldValidation(password, next);

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if(!user){
        return next(new ErrorResponse("User not found", 400));
    }

    const isMatch = user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse("Wrong password", 401));
    }

    delete user.dataValues.password;

    user.dataValues.token = await sign(user);
    user.dataValues.bio = null;
    user.dataValues.image = null;

    res.status(200).json({user});
})

const getCurrentUser = asyncHandler(async(req, res, next) => {
    const {loggedUser} = req;
    const user = await User.findByPk(loggedUser.id);

    if(!user) {
        return next(new ErrorResponse("User Not Found", 404));
    }

    user.dataValues.token = req.headers.authorization.split(" ")[1];
    res.status(200).json({user});
});

const updateUser = asyncHandler(async(req, res, next) => {
    await User.update(req.body.user, {
        where: {
            id: req.user.id,
        }
    });
    
    const user = await User.findByPk(req.user.id);
    user.dataValues.token = req.headers.authorization.split(" ")[1];

    res.status(200).json({user});
})

const fieldValidation = (field, next) => {
    if(!field){
        return next(new ErrorResponse(`Missing fields`, 400));
    }
}

module.exports = {
    createUser,
    loginUser,
    getCurrentUser,
    updateUser
}