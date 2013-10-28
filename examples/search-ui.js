var express = require('express');
var app = express();
var ABS = require('../.');

var abs = new ABS({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'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'});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/search-ui'));
app.set('port', process.env.PORT || 3000);
app.get('/search',abs.middleware());

app.listen(app.get('port'));

console.log('Listening at port '+app.get('port'));

module.exports = app;