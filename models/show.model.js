const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Theatre'
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    timing: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    format: {
        type: String
    }
}, {timestamps: true});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;