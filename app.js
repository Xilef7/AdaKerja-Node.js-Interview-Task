const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()),
    webhook = require('./routes/webhook'),
    messages = require('./routes/messages');

app.use('/webhook', webhook);
app.use('/messages', messages);

module.exports = app;
