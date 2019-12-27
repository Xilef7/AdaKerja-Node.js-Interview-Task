const eventLog = require('../models/eventLog');

exports.getAllEvents = (req, res) => {
    res.status(200).send(eventLog.getAllEvents());
};

exports.getEvent = (req, res) => {
    const messageId = req.params.id;

    event = eventLog.getEventById(messageId);

    if (event) {
        res.status(200).send(event);
    } else {
        res.sendStatus(404);
    }
};

exports.deleteEvent = (req, res) => {
    const messageId = req.params.id;

    try {
        eventLog.deleteEventById(messageId);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(404);
    }
};