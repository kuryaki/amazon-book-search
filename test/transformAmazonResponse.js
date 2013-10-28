var assert = require('assert');
var Amazon = require('../lib/amazon');
var humanizer = require('../lib/humanizer');

var should = require('should');

describe('Amazon JSON transformation', function(){
  this.timeout(15000);

  before(function(done){
    var self = this;
    self.amazon = new Amazon({awsKey:'AKIAI6HXKAF4PMFLG65A',awsSecret:'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'});
    self.amazon.query('pragmatic programmer', function(error, originalResponse){
      self.originalResults = originalResponse.results;
      humanizer.transformResults(originalResponse, function(error, response){
        self.results = response.results;
        done();
      });
    });
  });

  it('should return the same number of results', function(done){
    assert(this.results.length, this.originalResults.length);
    done();
  });

  it('original title should be equal to the transformed title', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('title');
    transformedResult.title.should.be.equal(anOriginalResult.ItemAttributes[0].Title[0]);
    done();
  });

  it('original author should be equal to the transformed author', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('author');
    transformedResult.author.should.be.equal(anOriginalResult.ItemAttributes[0].Author[0]);
    done();
  });

  it('original publisher should be equal to the transformed publisher', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('publisher');
    transformedResult.publisher.should.be.equal(anOriginalResult.ItemAttributes[0].Publisher[0]);
    done();
  });

  it('original publication date should be equal to the transformed date and properly formated', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('publicationDate');
    transformedResult.publicationDate.toString().should.be.equal(new Date(anOriginalResult.ItemAttributes[0].PublicationDate[0]).toString());
    done();
  });
  it('original edition number  should be equal to the transformed edition number or 0', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('edition');
    done();
  });
  it('original price should be equal to the transformed price', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('price');
    transformedResult.price.should.be.equal(anOriginalResult.ItemAttributes[0].ListPrice[0].FormattedPrice[0]);
    done();
  });
  it('original format should be equal to the transformed format', function(done){
    var anOriginalResult = this.originalResults[0];
    var transformedResult = humanizer.transform(anOriginalResult);
    transformedResult.should.have.property('format');
    transformedResult.format.should.be.equal(anOriginalResult.ItemAttributes[0].Binding[0]);
    done();
  });
});