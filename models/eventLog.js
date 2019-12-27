const events = []

function appendEvent(event) {
    events.push(event);
}

function getAllEvents() {
    return events;
}

function getEventById(id) {
    return events.find(event => event.message.mid === id);
}

function deleteEventById(id) {
    for (var i = 0; i < events.length; i++) {
        if (events[i].message.mid === id) {
            events.splice(i, 1);
            break;
        }
    }

    if (i === events.length) {
        throw 'NOT_FOUND';
    }
}

module.exports = {
    appendEvent,
    getAllEvents,
    getEventById,
    deleteEventById
};