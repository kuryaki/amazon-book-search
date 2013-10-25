var express = require('express');
var app = express();
var amazonMiddleware =  require('../.').middleware;

// app.use(express.logger('dev'));

app.get('/search',amazonMiddleware());

app.listen(3000);

module.exports = app;