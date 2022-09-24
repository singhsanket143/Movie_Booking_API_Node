const paymentService = require('../services/payment.service');
const { BOOKING_STATUS, STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model');
const sendMail = require('../services/email.service');

const create = async (req, res) => {
    try {
        const response = await paymentService.createPayment(req.body);
        if(response.status == BOOKING_STATUS.expired) {
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed, hence you booking got expired, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status == BOOKING_STATUS.cancelled) {
            errorResponseBody.err = 'The payment failed due to some reason, booking was not successfull, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        const user = await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        console.log(response, process.env.NOTI_SERVICE);
        sendMail(
            'Your booking is Successfull', 
            response.userId,
            `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successfull. Your booking id is ${response.id}`
        );

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

const getPaymentDetailsById = async (req, res) => {
    try {
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking and payment details";
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

const getAllPayments = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the payments";
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayments
}