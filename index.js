'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()),
    webhook = require('./routes/webhook'),
    messages = require('./routes/messages');

app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));

app.use('/webhook', webhook);
app.use('/messages', messages);
