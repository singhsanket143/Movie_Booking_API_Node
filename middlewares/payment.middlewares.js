const { STATUS } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responsebody")
const ObjectId = require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async (req, res, next) => {
    // validate booking id presence
    if(!req.body.bookingId) {
        errorResponseBody.err = 'No booking id received';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate correct bookingid
    if(!ObjectId.isValid(req.body.bookingId)) {
        errorResponseBody.err = 'Invalid booking id';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate amount presence
    if(!req.body.amount) {
        errorResponseBody.err = 'No amount sent';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // everything is fine
    next();

}

module.exports = {
    verifyPaymentCreateRequest
}