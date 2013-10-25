var amazon = require('./lib/amazon')('AKIAI6HXKAF4PMFLG65A', 'W75HoO0KQ6Seh/cBK1O/zIhSPPBbaePMWlRY0Ivh');
var humanizer = require('./lib/humanizer');

/**
 * Main search function
 * @param  {[type]}   searchArguments [The Search query, in a string form, example 'how to become a programmer']
 * @param  {Function} callback        [in the form function(error, results){}]
 */
var search = module.exports.search = function search(searchArguments, callback) {
  // TODO
  // -> End the request and force error response if it exceedes some timeout
  // -> Cache this request to answer faster or with cached results in case of timeout
  amazon.query(searchArguments, function(error, results){
    if(error){callback(error, null);return};
    humanizer.transformResults(results, callback);
  });

};

module.exports.middleware = function searchMiddleware(){
  return function(req, res, next){
    search(req.query.q, function(error, results){
      if(error){
        next(error);
        return false;
      };
      res.send(200, results);
      res.end();
    });
  };
}