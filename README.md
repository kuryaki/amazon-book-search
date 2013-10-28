## Amazon Book Search

This allows you to find books on amazon trough their product api, it have two ways for it to be used

### Install

     $ npm install amazon-book-search

### Tests
    
    $ npm install mocha -g
    $ npm test

### As a library 

    var Amazon = require('amazon-book-search');
    var amazonClient =  new Amazon(('awsKey','awsSecret'));

    // First 10 Results
    amazonClient.search('your thoughts on books', function(error, responses){
        console.log(responses);
    });

    // Next 10 results (page 2)
    amazonClient.search('your thoughts on books', 2,function(error, responses){
        console.log(responses);
    });

There is a maximum of 10 pages returned by Amazon so only 100 products will be displayed

### As a connect middleware

    var express = require('express');
    var app = express();
    var Amazon =  require('amazon-book-search');
    var abs = new Amazon({awsKey:'AKIAI6HXKAF4PMFLG65A', awsSecret:'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'});

    app.get('/search',abs.middleware());
    app.listen(3000);

Now go to http://localhost:3000/search to start making queries via querystring example:

* http://localhost:3000/search?q=tattoo
* http://localhost:3000/search?q=javascript&page=2

There is also a maximum of 10 pages limit

### Examples

You can also checkout this repo and go to the examples folder

    $ git clone https://github.com/kuryaki/amazon-book-search.git
    $ cd amazon-book-search
    $ npm install
    $ cd examples

#### Library

    $ node library

This will prompt results for a "node.js" search on amazon

#### REST-API

    $ node rest-api

This will launch an http server on _localhost_ listening at port _3000_ check the connect middleware documentation to make queries

#### Simple UI

    $ node search-ui

This will launch the an enhanced REST-API server, but now you can go to http://localhost:3000/ and start making searchs there

