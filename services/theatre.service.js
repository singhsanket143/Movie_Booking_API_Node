const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');

/**
 * 
 * @param data -> object containing details of the theatre to be created
 * @returns -> object with the new theatre details
 */
const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: STATUS.UNPROCESSABLE_ENTITY};
        }
        console.log(error);
        throw err;
    }
}

/**
 * 
 * @param id -> the unique id using which we can identify the theatre to be deleted
 * @returns -> returns the deleted theatre object
 */
const deleteTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if(!response) {
            throw {
                err: "No record of a theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 
 * @param id -> it is the unique _id based on which we will fetch a theatre
 */
const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if(!response) {
            // no record found for the given id
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 
 * @param data -> the data to be used to filter out theatres based on city / pincode 
 * @returns -> returns an object with the filtered content of theatres
 */
const getAllTheatres = async (data) => {
    try {
        let query = {};
        let pagination = {};
        if(data && data.city) {
            // this checks whether city is present in query params or not
            query.city = data.city;
        } 
        if(data && data.pincode) {
            // this checks whether pincode is present in query params or not
            query.pincode = data.pincode;
        }
        if(data && data.name) {
            // this checks whether name is present in query params or not 
            query.name = data.name;
        }

        if(data && data.movieId) {
            query.movies = {$all: data.movieId};
        }

        if(data && data.limit) {
            pagination.limit = data.limit;
        }
        
        if(data && data.skip) {
            // for first page we send skip as 0
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip*perPage;
        }
        const response = await Theatre.find(query, {}, pagination); // {pincode: 110031, movies: {$all: movie}}
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

/**
 * 
 * @param id -> the unique id to identify the theatre to be updated
 * @param data -> data object to be used to update the theatre
 * @returns -> it returns the new updated theatre object
 */
const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true, runValidators: true
        });
        if(!response) {
            // no record found for the given id
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: STATUS.UNPROCESSABLE_ENTITY}
        }
        throw error;
    }
}

/**
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param movieIds -> array of movie ids that are expected to be updated in theatre
 * @param insert -> boolean that tells whether we want insert movies or remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try {
        let theatre;
        if (insert) {
            // we need to add movies
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$addToSet: {movies: {$each: movieIds}}},
                {new: true}
            );
        } else {
            // we need to remove movies
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}},
                {new: true}
            );
        }
        
        return theatre.populate('movies');
    } catch (error) {
        if(error.name == 'TypeError') {
            throw {
                code: STATUS.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}

const getMoviesInATheatre = async (id) => {
    try {
        const theatre = await Theatre.findById(id, {name: 1, movies: 1, address: 1}).populate('movies');
        if(!theatre) {
            throw {
                err: 'No theatre with the given id found',
                code: STATUS.NOT_FOUND
            }
        }
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        let response = await Theatre.findById(theatreId);
        if(!response) {
            throw {
                err: "No such theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInATheatre,
    checkMovieInATheatre
}