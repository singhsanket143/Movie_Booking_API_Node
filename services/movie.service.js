const Movie = require('../models/movie.model');

const createMovie = async (data) => {
    const movie = await Movie.create(data);
    return movie;
}

const deleteMovie = async (id) => {
    const response = await Movie.findByIdAndDelete(id);
    return response
}

const getMoviById = async (id) => {
    const movie = await Movie.findById(id);
    if(!movie) {
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }
    };
    return movie;
}

module.exports = {
    createMovie,
    deleteMovie,
    getMoviById
}