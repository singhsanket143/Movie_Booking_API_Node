const Show = require('../models/show.model');
const Theatre = require('../models/theatre.model');
const { STATUS } = require('../utils/constants');

/**
 * 
 * @param data -> object containing details of the show to be created
 * @returns -> object with the new show details
 */
const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre) {
            throw {
                err: 'No theatre found',
                code: STATUS.NOT_FOUND
            }
        }
        if(theatre.movies.indexOf(data.movieId) == -1) {
            throw {
                err: 'Movie is currently not available in the requested theatre',
                code: STATUS.NOT_FOUND
            }
        }
        const response = await Show.create(data);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            }
        }
        throw error;
    }
}

const getShows = async (data) => {
    try {
        let filter = {};
        if(data.theatreId) {
            filter.theatreId = data.theatreId;
        } 
        if(data.movieId) {
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if(!response) {
            throw {
                err: 'No shows found',
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteShow = async (id) => {
    try {
        const response = await Show.findByIdAndDelete(id);
        if(!response) {
            throw {
                err: 'No show found',
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const updateShow = async (id, data) => {
    try {
        const response = await Show.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if(!response) {
            throw {
                err: 'No show found for the given id',
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            }
        }
        throw error;
    }
}

module.exports = {
    createShow,
    getShows,
    deleteShow,
    updateShow
}