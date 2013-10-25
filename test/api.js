var request = require('supertest');
var should = require('should');
var api = require('../api');
var qs = require('querystring');

describe('API', function(){
  it('should be ok(200) at search(/search)', function(done){
    request(api)
      .get('/search')
      .expect(200)
      .end(function(error, response){
        response.body.should.be.an.Array;
        response.body.should.be.empty;
        done(); 
      });
  });
  it('should be show query results when request', function(done){
    var query = qs.stringify({q:'primus'});
    request(api)
      .get('/search?'+query)
      .expect(200)
      .end(function(error, response){
        response.body.should.be.an.Array;
        response.body.should.not.be.empty;
        done();
      });
  });

  it('should resolve depending on content/type, ex. html, json');
  it('should show next pages of results');
});