const theatreController = require('../controllers/theatre.controller');

const routes = (app) => {
    app.post(
        '/mba/api/v1/theatres',
        theatreController.create
    );
}

module.exports = routes;