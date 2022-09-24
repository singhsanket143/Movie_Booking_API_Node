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
        errorResponseBody.err = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody)
    }
    // validation for the presence of pincode
    if(!req.body.pincode) {
        errorResponseBody.err = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    // validation for the presence of city
    if(!req.body.city) {
        errorResponseBody.err = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    next(); // everything is fine move to the next middleware
}

const validateUpdateMoviesRequest = async (req, res, next) => {
    // validattion of insert parameter
    if(req.body.insert == undefined) {
        errorResponseBody.err = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }
    // validate movieIds presence
    if(!req.body.movieIds) {
        errorResponseBody.err = "No movies present in the request to be updated in theatre";
        return res.status(400).json(errorResponseBody);
    }
    // validate if movieIds is an array or not
    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.err = "Expected array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }
    // validate if movieIds is empty or not
    if(req.body.movieIds.length == 0) {
        errorResponseBody.err = "No movies present in the array provided";
        return res.status(400).json(errorResponseBody);
    }
    // everything is fine
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
}