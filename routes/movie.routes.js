const MovieController = require('../controllers/movie.controller');
const MovieMiddlewares = require('../middlewares/movie.middlewares');

const routes = (app) => {
    // routes function takes express app object as parameter
    app.post(
        '/mba/api/v1/movies', 
        MovieMiddlewares.validateMovieCreateRequest,
        MovieController.createMovie
    );

    app.delete(
        '/mba/api/v1/movies/:movieId',
        MovieController.deleteMovie
    );
}

module.exports = routes;