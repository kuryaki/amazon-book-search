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
    edition: theItem.Edition?(parseInt(theItem.Edition[0])?getGetOrdinal(parseInt(theItem.Edition[0]))+' Ed.':theItem.Edition[0]):undefined, // I hould probably not do this
    price: theItem.ListPrice?theItem.ListPrice[0].FormattedPrice[0]:'n/a',
    format: theItem.Binding[0]
  };
}

function getGetOrdinal(n) {
  var s=["th","st","nd","rd"],
      v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}