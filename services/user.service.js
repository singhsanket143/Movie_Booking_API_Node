const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS} = require('../utils/constants');

const createUser = async (data) => {
    try {
        if(!data.userRole || data.userRole == USER_ROLE.customer) {
            if(data.userStatus && data.userStatus != USER_STATUS.approved) {
                throw {
                    err: "We cannot set any other status for customer", 
                    code: 400
                };
            }
        }
        if(data.userRole && data.userRole != USER_ROLE.customer) {
            data.userStatus = USER_STATUS.pending;
        }
        
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

const getUserByEmail = async (email) => {
    try {
        const response = await User.findOne({
            email: email
        });
        if(!response) {
            throw {err: "No user found for the given email", code: 404};
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail
}