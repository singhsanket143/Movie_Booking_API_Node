const axios = require('axios');
const User = require('../models/user.model');
const sendMail = async (subject, id, content) => {
    const user = await User.findById(id);
    axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications', {
        subject: subject,
        recepientEmails: [user.email] ,
        content: content
     });
}

module.exports = sendMail;