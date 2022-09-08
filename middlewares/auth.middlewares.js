const { errorResponseBody } = require('../utils/responsebody');

/**
 * validator for user signup
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 */
const validateSignupRequest = async (req, res, next) => {
    // validate name of the user
    if(!req.body.name) {
        errorResponseBody.err = "Name of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validate email of the user
    if(!req.body.email) {
        errorResponseBody.err = "Email of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validate password present of the user
    if(!req.body.password) {
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // request is valid
    next();
}

/**
 * validator for user signin
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 */
const validateSigninRequest = async (req, res, next) => {
    // validate user email presence
    if(!req.body.email) {
        errorResponseBody.err = "No email provided for sign in";
        return res.status(400).json(errorResponseBody);
    }

    // validate user password presence
    if(!req.body.password) {
        errorResponseBody.err = "No password provided for sign in";
        return res.status(400).json(errorResponseBody);
    }

    // request is valid
    next();
}


module.exports = {
    validateSignupRequest,
    validateSigninRequest
}