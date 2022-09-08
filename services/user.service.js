const User = require('../models/user.model');

const createUser = async (data) => {
    try {
        const response = await User.create(data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: 422};
        }
        throw error;
    }
}

module.exports = {
    createUser
}