var amazon = require('./lib/amazon');
var humanizer = require('./lib/humanizer');

module.exports.search = function search(searchArguments, callback) {
  // TODO
  // -> End the request and force error response if it exceedes some timeout
  // -> Cache this request to answer faster or with cached results in case of timeout
  amazon.query(searchArguments, function(error, results){
    humanizer.transformResults(results, callback);
  });

};