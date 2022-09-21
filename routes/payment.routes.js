const paymentController = require('../controllers/payment.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const paymentMiddlewares = require('../middlewares/payment.middlewares');
const routes = (app) => {
    app.post(
        '/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        paymentMiddlewares.verifyPaymentCreateRequest,
        paymentController.create
    )
}

module.exports = routes;