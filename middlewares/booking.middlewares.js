const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const theatreService = require('../services/theatre.service');

const validateBookingCreateRequest = async (req, res, next) => {
    // validate the theatre id presence
    if(!req.body.theatreId) {
        errorResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate correct theatre id format
    if(!ObjectId.isValid(req.body.theatreId)) {
        errorResponseBody.err = "Invalid theatreid provided" 
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // check if theatre exists in database
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre) {
        errorResponseBody.err = "No theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // validate movie presence
    if(!req.body.movieId) {
        errorResponseBody.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate correct movie if format
    if(!ObjectId.isValid(req.body.movieId)) {
        errorResponseBody.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate if movie is running in the theatre or not ? 
    console.log(theatre.movies.indexOf(req.body.movieId), req.body.movieId);
    if(theatre.movies.indexOf(req.body.movieId) == -1) {
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // validate presence of timings
    if(!req.body.timing) {
        errorResponseBody.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate no of seats presence
    if(!req.body.noOfSeats) {
        errorResponseBody.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // request is correct
    next();

}

module.exports = {
    validateBookingCreateRequest
}