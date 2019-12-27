'use strict';
const app = require('./app');

app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));