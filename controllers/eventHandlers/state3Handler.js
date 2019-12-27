const userData = require('../../models/userData');

const callSendAPI = require('../../utils/callSendAPI');

function handleEvent(sender_psid, received_event) {
    const user = userData.getUserDataById(sender_psid);
    
    let response;

    if (isRepliedYes(received_event)) {

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const nextBirthday = user.birthDate;

        nextBirthday.setFullYear(now.getFullYear());
        if (nextBirthday <= now) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }

        const daysLeft = Math.round((nextBirthday - now) / (1000 * 60 * 60 * 24));

        response = {
            "text": `There are ${daysLeft} days left until your next birthday.`
        };
    } else {
        response = {
            "text": `Goodbye 👋`
        };
    }

    user.state += 1;

    callSendAPI(sender_psid, response);
}

function isRepliedYes(received_event) {
    if (received_event.message) {
        const yesWords = ['yes', 'yeah', 'yup'];
        const userAnswer = received_event.message.text;

        return yesWords.includes(userAnswer)
    } else if (received_event.quick_reply) {
        const userAnswer = received_event.quick_reply.payload;

        return userAnswer === 'yes';
    }
}

module.exports = { handleEvent };
