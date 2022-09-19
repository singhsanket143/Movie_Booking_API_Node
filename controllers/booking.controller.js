const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const bookingService = require('../services/booking.services');
const { STATUS } = require('../utils/constants');

const create = async (req, res) => {
    try {
        let userId = req.user;
        const response = await bookingService.createBooking({...req.body, userId: userId});
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch(error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const update = async (req, res) => {
    try {
        const response = await bookingService.updateBooking(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the booking";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getBookings = async (req, res, next) => {
    try {
        const response = await bookingService.getBookings({userId: req.user});
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the bookings";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllBookings = async (req, res, next) => {
    try {
        const response = await bookingService.getAllBookings();
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the bookings";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getBookingById = async (req, res, next) => {
    try {
        const response = await bookingService.getBookingById(req.params.id, req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}


module.exports = {
    create,
    update,
    getBookings,
    getAllBookings,
    getBookingById
}