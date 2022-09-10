const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middlewares');
const authMiddlewares = require('../middlewares/auth.middlewares');

const routes = (app) => {
    // routes function takes express app object as parameter

    // CREATE
    app.post(
        '/mba/api/v1/movies', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );

    // DELETE
    app.delete(
        '/mba/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.deleteMovie
    );

    // READ
    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    );

    // READ
    app.put(
        '/mba/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.updateMovie
    );

    // UPDATE
    app.patch(
        '/mba/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.updateMovie
    );

    // UPDATE
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    );
}

module.exports = routes;