const { errorResponseBody } = require('../utils/responsebody');

/**
 * 
 * @param req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */
const validateTheatreCreateRequest = async (req, res, next) => {
    // validate the presence of name
    if(!req.body.name) {
        errorResponseBody.message = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody)
    }
    // validation for the presence of pincode
    if(!req.body.pincode) {
        errorResponseBody.message = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    // validation for the presence of city
    if(!req.body.city) {
        errorResponseBody.message = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    next(); // everything is fine move to the next middleware
}

module.exports = {
    validateTheatreCreateRequest
}