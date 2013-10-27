var _ = require('underscore');
var self = this;

module.exports.transformResults = function transformResults(response, callback){
  response.results = _.map(response.results, self.transform);
  callback(null, response);
};

module.exports.transform = function transform(amazonItem){
  var theItem = amazonItem.ItemAttributes[0];
  return {
    title: theItem.Title[0],
    author: theItem.Author?theItem.Author[0]:'',
    publisher: theItem.Publisher?theItem.Publisher[0]:'',
    publicationDate: theItem.PublicationDate?new Date(theItem.PublicationDate[0]):undefined,
    edition: theItem.Edition?parseInt(theItem.Edition[0]):0,
    price: theItem.ListPrice?parseInt(theItem.ListPrice[0].Amount[0]):0,
    currency: theItem.ListPrice?theItem.ListPrice[0].CurrencyCode[0]:'',
    format: theItem.Binding[0]
  };
}