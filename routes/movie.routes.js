const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middlewares');

const routes = (app) => {
    // routes function takes express app object as parameter
    app.post(
        '/mba/api/v1/movies', 
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );

    app.delete(
        '/mba/api/v1/movies/:id',
        movieController.deleteMovie
    );

    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    );

    app.put(
        '/mba/api/v1/movies/:id',
        movieController.updateMovie
    );

    app.patch(
        '/mba/api/v1/movies/:id',
        movieController.updateMovie
    );

    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    );
}

module.exports = routes;