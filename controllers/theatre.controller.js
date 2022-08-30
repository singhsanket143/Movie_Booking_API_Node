const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        if(response.err) {
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the theatre"
        return res.status(201).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    create
}