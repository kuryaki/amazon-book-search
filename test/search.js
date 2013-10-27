var assert = require('assert');
var should = require('should');
var ABS = require('../.');
//awsKey 'AKIAI6HXKAF4PMFLG65A'
//awsSecret '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'

describe('Configure', function(){
  before(function(done){
    this.timeout(5000);
    done();
  });

  it('should not work if not configured', function(done){
    // some how this test fails when the whole test suite runs i think im doing something wrong loading the modules
    // i figured it out that the amazon module should properly encapsulate the settings to prevent a request.cache leak
    this.abs = new ABS();
    this.abs.search('Wizard of OZ', function(error, response){
      assert(error);
      error.should.be.an.Object;
      should.exists(error.message);
      done();
    });
  });
  it('should not work if configuration misses key or secret', function(done){
    this.abs = new ABS({awsKey:'badAwsKey'});
    this.abs.search('Wizard of OZ', function(error, response){
      assert(error);
      error.should.be.an.Object;
      should.exists(error.message);
      done();
    });
  });
  it('should not work if apiKey is broken', function(done){
    this.abs = new ABS({awsKey:'badAwsKey',awsSecret:'W75HoO0KQ6Seh/cBK1O/zIhSPPBbaePMWlRY0Ivh'});
    this.abs.search('Wizard of OZ', function(error, response){
      assert(error);
      error.should.be.an.Object;
      should.exists(error.message);
      done();
    });
  });
  it('should not work if apiSecret is broken', function(done){
    this.abs = new ABS({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'badSecret'});
    this.abs.search('Wizard of OZ', function(error, response){
      assert(error);
      error.should.be.an.Object;
      should.exists(error.message);
      done();
    });
  });
  it('should work if properly configured', function(done){
    this.abs = new ABS({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'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'});
    this.abs.search('Wizard of OZ', function(error, response){
      assert(response.results);
      response.results.should.be.an.Array;
      done();
    });
  });
});


describe('Search', function() {
  this.timeout(5000);
  before(function(done){
    this.abs = require('../.');
    this.abs = new ABS({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'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'});
    done();
  });

  it('response should be an object', function(done){
    this.abs.search('Some weird results', function(error, response){
      assert(response);
      response.should.be.an.Object;
      response.should.not.be.empty;
      done();
    });
  });

  it('response should should have the totalResults, totalPages, currentPage and results attributes', function(done){
    this.abs.search('Some weird results', function(error, response){
      response.should.be.an.Object;
      response.should.have.property('totalResults');
      response.should.have.property('totalPages');
      response.should.have.property('currentPage');
      response.should.have.property('results');
      done();
    });
  });

  it('response results should exist and not be empty', function(done){
    this.abs.search('Some weird results', function(error, response){
      assert(response.results);
      response.results.should.be.an.Array;
      response.results.should.not.be.empty;
      done();
    });
  });


  it('response respults should return a 0 results if weird characters used', function(done){
    this.abs.search('-', function(error, response){
      assert(response.results);
      response.results.should.be.an.Array;
      response.results.should.be.empty;
      done();
    });
  });

  it('response results should be an array with result objects', function(done){
    this.abs.search('pragmatic programmer', function(error, response){
      var aResult = response.results[0];

      assert(aResult);
      aResult.should.be.an.Object;
      aResult.should.not.be.empty;

      done();
    });
  });

  it('response results should work when requesting more pages be an array with result objects', function(done){
    this.abs.search('pragmatic programmer', '2', function(error, response){
      assert(response.results);
      response.results.should.be.an.Array;
      response.results.should.not.be.empty;
      done();
    });
  });

  it('response results should return empty if page higher than total pages requested', function(done){
    this.abs.search('toothpaste peanut', '3', function(error, response){
      assert(response.results);
      response.results.should.be.an.Array;
      response.results.should.be.empty;
      done();
    });
  });

  it('response results should return error if page higher than 10 (Amazon constraint)', function(done){
    this.abs.search('pragmatic programmer', '11', function(error, response){
      assert(error);
      done();
    });
  });
  // if page > 10
});

describe('Results,', function(){
  before(function(done){
    this.timeout(5000);
    this.abs = new ABS({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'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'});
    var self = this;
    this.abs.search('pragmatic programmer', function(error, response){
      self.aResult = response.results[0];
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

