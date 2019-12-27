'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    app = express().use(bodyParser.json());

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const USER_DATA = {};

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            handleMessage(webhook_event.sender.id, webhook_event.message);
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

function handleMessage(sender_psid, received_message) {
    if (USER_DATA[sender_psid]) {
        switch (USER_DATA[sender_psid].state) {
            case 1:
                handleState1(sender_psid, received_message);
                break;
            case 2:
                handleState2(sender_psid, received_message);
                break;
            case 3:
                handleState3(sender_psid, received_message);
                break;
        }
    } else {
        handleInitialState(sender_psid, received_message);
    }
}

function handleInitialState(sender_psid, received_message) {
    const response = {
        "text": `Hi! What is your first name?`
    };

    USER_DATA[sender_psid] = {
        state: 1
    };

    callSendAPI(sender_psid, response);
}

function handleState1(sender_psid, received_message) {
    USER_DATA[sender_psid].firstName = received_message.text;

    const response = {
        "text": `What is your birth date?`
    };

    USER_DATA[sender_psid].state += 1;

    callSendAPI(sender_psid, response);
}

function handleState2(sender_psid, received_message) {
    USER_DATA[sender_psid].birthDate = parseDate(received_message.text);

    const response = {
        "text": `Do you want to know how many days till your next birthday?`
    };

    USER_DATA[sender_psid].state += 1;

    callSendAPI(sender_psid, response);
}

function parseDate(dateString) {
    const [year, month, day] = dateString.split('-');

    return new Date(year, month - 1, day);
}

function handleState3(sender_psid, received_message) {
    let response;

    if (received_message.text == 'yes') {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const nextBirthday = USER_DATA[sender_psid].birthDate;

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

    USER_DATA[sender_psid].state += 1;

    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}