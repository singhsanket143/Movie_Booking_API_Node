const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const showMiddlewares = require('../middlewares/show.middlewares');

const routes = (app) => {
    app.post(
        '/mba/api/v1/shows',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateCreateShowRequest,
        showController.create
    );
}

module.exports = routes;