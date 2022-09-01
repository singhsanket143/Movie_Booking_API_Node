const Theatre = require('../models/theatre.model');

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
            return {err: err, code: 422};
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
            return {
                err: "No record of a theatre found for the given id",
                code: 404
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
            return {
                err: "No theatre found for the given id",
                code: 404
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
        if(data && data.limit) {
            pagination.limit = data.limit;
        }
        if(data && data.skip) {
            // for first page we send skip as 0
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip*perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
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
            return {
                err: "No theatre found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            return {err: err, code: 422}
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
    const theatre = await Theatre.findById(theatreId);
    if(!theatre) {
        return {
            err: "No such theatre found for the id provided",
            code: 404
        };
    }
    if (insert) {
        // we need to add movies
        movieIds.forEach(movieId => {
            theatre.movies.push(movieId);
        });
    } else {
        // we need to remove movies
        let savedMovieIds = theatre.movies;
        movieIds.forEach(movieId => {
            savedMovieIds = savedMovieIds.filter(smi => smi == movieId);
        });
        theatre.movies = savedMovieIds;
    }
    await theatre.save();
    return theatre.populate('movies');
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres
}