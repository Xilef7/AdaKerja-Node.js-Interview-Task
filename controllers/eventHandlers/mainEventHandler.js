const initialStateHandler = require('./initialStateHandler');
const firstNameHandler = require('./firstNameHandler');
const birthDateHandler = require('./birthDateHandler');
const nextBirthdayHandler = require('./nextBirthdayHandler');

const userData = require('../../models/userData');

function handleEvent(sender_psid, received_event) {
    const user = userData.getUserDataById(sender_psid);
    if (user) {
        switch (user.state) {
            case 'FIRST_NAME':
                firstNameHandler.handleEvent(sender_psid, received_event);
                break;
            case 'BIRTH_DATE':
                birthDateHandler.handleEvent(sender_psid, received_event);
                break;
            case 'NEXT_BIRTHDAY':
                nextBirthdayHandler.handleEvent(sender_psid, received_event);
                break;
        }
    } else {
        initialStateHandler.handleEvent(sender_psid, received_event);
    }
}

module.exports = { handleEvent };
