const userData = require('../../models/userData');

const callSendAPI = require('../../utils/callSendAPI');

function handleEvent(sender_psid, received_event) {
    if (!received_event.message) return;

    const user = userData.getUserDataById(sender_psid);

    user.firstName = received_event.message.text;

    const response = {
        "text": `What is your birth date?`
    };

    user.state += 1;

    callSendAPI(sender_psid, response);
}

module.exports = { handleEvent };
