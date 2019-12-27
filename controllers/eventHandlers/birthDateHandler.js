const userData = require('../../models/userData');

const callSendAPI = require('../../utils/callSendAPI');

function handleEvent(sender_psid, received_event) {
    if (!received_event.message) return;

    const user = userData.getUserDataById(sender_psid);

    user.birthDate = parseDate(received_event.message.text);

    const response = {
        "text": `Do you want to know how many days till your next birthday?`,
        "quick_replies": [
            {

                "content_type": "text",
                "title": "yes",
                "payload": "yes",

            },
            {

                "content_type": "text",
                "title": "no",
                "payload": "no",
            }
        ]
    };

    user.state = 'NEXT_BIRTHDAY';

    callSendAPI(sender_psid, response);
}

function parseDate(dateString) {
    const [year, month, day] = dateString.split('-');

    return new Date(year, month - 1, day);
}

module.exports = { handleEvent };
