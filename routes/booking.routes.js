const bookingController = require('../controllers/booking.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const bookingMiddleware = require('../middlewares/booking.middlewares');

const routes = (app) => {
    app.post(
        '/mba/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingMiddleware.validateBookingCreateRequest,
        bookingController.create
    )
}

module.exports = routes;