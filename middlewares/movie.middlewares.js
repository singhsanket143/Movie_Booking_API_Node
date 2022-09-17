const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};

const { STATUS } = require('../utils/constants');

/**
 * 
 * @param req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */
const validateMovieCreateRequest = async (req, res, next) => {
    // validate the movie name
    if(!req.body.name) {
        badRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the movie description
    if(!req.body.description) {
        badRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the movie casts
    if(!req.body.casts || 
       !(req.body.casts instanceof Array) ||
       req.body.casts.length <= 0
    ) {
        badRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the movie trailer url
    if(!req.body.trailerUrl) {
        badRequestResponse.err = "The trailerUrl of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the release date of the movie
    if(!req.body.releaseDate) {
        badRequestResponse.err = "The releaseDate of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validate director of the movie
    if(!req.body.director) {
        badRequestResponse.err = "The director of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    next();
}

module.exports = {
    validateMovieCreateRequest
}