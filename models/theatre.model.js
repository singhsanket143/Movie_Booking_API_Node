const mongoose = require('mongoose');
/**
 * Defines the schema of theatre resource to be stored in the db
 */

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        tpye: Number,
        required: true
    },
    address: String
}, {timestamps: true});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;
