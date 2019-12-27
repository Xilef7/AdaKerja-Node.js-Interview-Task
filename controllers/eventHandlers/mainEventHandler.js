const initialStateHandler = require('./initialStateHandler');
const state1Handler = require('./state1Handler');
const state2Handler = require('./state2Handler');
const state3Handler = require('./state3Handler');

const userData = require('../../models/userData');

function handleEvent(sender_psid, received_event) {
    const user = userData.getUserDataById(sender_psid);
    if (user) {
        switch (user.state) {
            case 1:
                state1Handler.handleEvent(sender_psid, received_event);
                break;
            case 2:
                state2Handler.handleEvent(sender_psid, received_event);
                break;
            case 3:
                state3Handler.handleEvent(sender_psid, received_event);
                break;
        }
    } else {
        initialStateHandler.handleEvent(sender_psid, received_event);
    }
}

module.exports = { handleEvent };
