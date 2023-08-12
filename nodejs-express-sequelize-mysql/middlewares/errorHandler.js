const ErrorResponse = require("../util/errorResponse");

const notFound = (req, res, next) => {
    const error = new ErrorResponse(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    console.log(err.message.red);
    console.log(err.stack.red);

    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({
        errors: {
            body: [err.message]
        }
    });
};

module.exports = {
    errorHandler,
    notFound
}