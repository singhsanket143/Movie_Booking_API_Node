const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');

const routes = (app) => {
    // routes function takes express app object as parameter

    // CREATE
    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    // DELETE
    app.delete(
        '/mba/api/v1/theatres/:id',
        theatreController.destroy
    );

    // READ
    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    );

    // READ
    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    );

    // UPDATE
    app.patch(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    );

    // UPDATE
    app.put(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    );

    app.patch(
        '/mba/api/v1/theatres/:id/movies',
        theatreMiddleware.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );

    app.get(
        '/mba/api/v1/theatres/:id/movies',
        theatreController.getMovies
    )

    app.get(
        '/mba/api/v1/theatres/:theatreId/movies/:movieId',
        theatreController.checkMovie
    );
}

module.exports = routes;