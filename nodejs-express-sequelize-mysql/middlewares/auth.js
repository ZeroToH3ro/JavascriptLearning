const User = require("../models/User");
const {verify} = require("../util/jwt");
const ErrorResponse = require("../util/errorResponse");

/*
* Protect function include:
* 1) loggedUser
* 2) email
* 3) token
*
*
*  In summary, the protect middleware is responsible for authenticating requests by extracting and verifying a token from
*  the authorization header. It then fetches user data based on the verified token and attaches relevant information to the
*  request object before allowing the request to proceed. If any step fails or an error occurs, the middleware handles the
* error and passes it to the error-handling middleware.
* */

module.exports.protect = async (req, res, next) => {
    try {
        // Extract header
        const {headers} = req;
        if (!headers || !headers["authorization"]) return next();
        // Extract token and get the element at index [1] as second element
        const token = headers.authorization.split(" ")[1];
        if (!token) throw new SyntaxError("Token missing or malformed");
        //Fetch userVerified and check this by token after extracting
        const userVerified = await verify(token);
        if (!userVerified) throw new Error("Invalid Token");
        // Update logged user
        req.loggedUser = await User.findOne({
            attributes: {exclude: ["email", "password"]},
            where: {email: userVerified.email},
        });
        if (!req.loggedUser) next(new ErrorResponse("User"));

        headers.email = userVerified.email;
        req.loggedUser.dataValues.token = token;

        next();
    } catch (error) {
        next(error);
    }
};

