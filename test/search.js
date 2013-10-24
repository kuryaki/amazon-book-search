var assert = require('assert');
var app = require('../app');

var should = require('should');

describe('Search', function() {
  this.timeout(5000);

  it('should exist and not be empty', function(done){
    app.search('Some weird results', function(error, results){
      assert(results);
      results.should.be.an.Array;
      results.should.not.be.empty;
      done(error, results);
    });
  });

  it('should return an 0 results if something went wrong', function(done){
    app.search('-', function(error, results){
      assert(results);
      results.should.be.an.Array;
      results.should.be.empty;
      done(error, results);
    });
  });

  it('results should be an array with result objects', function(done){
    app.search('pragmatic programmer', function(error, results){
      var aResult = results[0];

      assert(aResult);
      aResult.should.be.an.Object;
      aResult.should.not.be.empty;

      done(error, results);
    });
  });

});

describe('Results,', function(){
  before(function(done){
    var self = this;
    app.search('pragmatic programmer', function(error, results){
      self.aResult = results[0];
      done();
    });
  });

  it('a result should have a title', function(done){
    this.aResult.should.have.property('title');
    this.aResult.title.should.be.a.String;
    done();
  });
  it('a result should have an author',function(done){
    this.aResult.should.have.property('author');
    this.aResult.author.should.be.a.String;
    done();
  });
  it('a result should have a publisher',function(done){
    this.aResult.should.have.property('publisher');
    this.aResult.publisher.should.be.a.String;
    done();
  });
  it('a result should have a publication date',function(done){
    this.aResult.should.have.property('publicationDate');
    this.aResult.publicationDate.should.be.a.Date;
    done();
  });
  it('a result should have an edition number',function(done){
    this.aResult.should.have.property('edition');  // If not avaliable should be 0
    this.aResult.edition.should.be.a.Number;
    done();
  });
  it('a result should have a price',function(done){
    this.aResult.should.have.property('price');
    this.aResult.price.should.be.a.Number;
    done();
  });
  it('a result should have a currency',function(done){
    this.aResult.should.have.property('currency');
    this.aResult.currency.should.be.a.String;
    done();
  });
  it('a result should have a format',function(done){
    this.aResult.should.have.property('format');
    this.aResult.format.should.be.a.String;
    done();
  });
});
