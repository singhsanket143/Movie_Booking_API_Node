const mongoose = require('mongoose'); 

/**
 * Define the schema of the movie resource to be stored in the db
 */
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED",
    },
    poster: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema); // creates a new model

module.exports = Movie; // returning the model 