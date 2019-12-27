const userData = require('../../models/userData');

const callSendAPI = require('../../utils/callSendAPI');

function handleEvent(sender_psid, received_event) {
    const response = {
        "text": `Hi! What is your first name?`
    };

    userData.addNewUserData(sender_psid, { state: 'FIRST_NAME' });

    callSendAPI(sender_psid, response);
}

module.exports = { handleEvent };
