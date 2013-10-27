var express = require('express');
var app = express();
var ABS = require('../.');

var abs = new ABS({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'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'});

app.get('/search',abs.middleware());

app.listen(3000);

module.exports = app;