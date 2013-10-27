var amazon = require('./lib/amazon');
var humanizer = require('./lib/humanizer');

/**
 * Main search function
 * @param  {[type]}   searchArguments [The Search query, in a string form, example 'how to become a programmer']
 * @param  {Function} callback        [in the form function(error, results){}]
 */
module.exports.search = function search(searchArguments, callback) {
  if(!this.configured){callback({message:'Not Properly Configured'},null);return;}
  if(!searchArguments){searchArguments='';}
  // TODO
  // -> End the request and force error response if it exceedes some timeout
  // -> Cache this request to answer faster or with cached results in case of timeout
  amazon.query(searchArguments, function(error, results){
    if(error){callback(error, null);return};
    humanizer.transformResults(results, callback);
  });

};

/**
 * Use this book search as a connect like middleware
 * @return {[type]} [description]
 */
module.exports.middleware = function searchMiddleware(){
  var self = this;
  return function(req, res, next){
    self.search(req.query.q, function(error, results){
      if(error){
        res.send(400, error);
        return false;
      };
      res.send(200, results);
      res.end();
    });
  };
}

module.exports.configure = function configure(settings){
  if(settings.awsKey && settings.awsSecret){
    amazon.configure(settings);
    this.configured = true;
  }else{
    this.configured = false;
  }
}