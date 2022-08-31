const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');

const routes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete(
        '/mba/api/v1/theatres/:id',
        theatreController.destroy
    )
}

module.exports = routes;