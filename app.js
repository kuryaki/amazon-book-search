var amazon = require('./lib/amazon');

module.exports.search = function search(searchArguments, callback) {
  // TODO
  // -> End the request and force error response if it exceedes some timeout
  // -> Cache this request to answer faster or with cached results in case of timeout
  amazon.query(searchArguments, function(error, results){
    transformResults(results, callback);
  });

};

module.exports.transformResults = function transformResults(results, callback){
  callback(null, results);
};

module.exports.transform = function transform(amazonItem){
  var theItem = amazonItem.ItemAttributes[0];
  return {
    title: theItem.Title[0],
    author: theItem.Author[0],
    publisher: theItem.Publisher[0],
    publicationDate: new Date(theItem.PublicationDate[0]),
    edition: theItem.Edition[0] || 0,
    price: theItem.ListPrice[0].Amount[0],
    currency: theItem.ListPrice[0].CurrencyCode[0],
    format: theItem.Binding[0]
  };
}