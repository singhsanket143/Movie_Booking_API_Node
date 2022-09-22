const paymentController = require('../controllers/payment.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const paymentMiddlewares = require('../middlewares/payment.middlewares');
const routes = (app) => {
    app.post(
        '/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        paymentMiddlewares.verifyPaymentCreateRequest,
        paymentController.create
    );

    app.get(
        '/mba/api/v1/payments/:id',
        authMiddlewares.isAuthenticated,
        paymentController.getPaymentDetailsById
    );

    app.get(
        '/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        paymentController.getAllPayments
    );
}

module.exports = routes;