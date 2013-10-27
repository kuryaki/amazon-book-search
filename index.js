var Amazon = require('./lib/amazon');
var humanizer = require('./lib/humanizer');

function ABS(settings){
  if(!settings || !settings.awsKey || !settings.awsSecret){
    this.configured = false;
  }else{
    this.configured = true;
    this.amazon = new Amazon(settings);
  }
}

/**
 * Main search function
 * @param  {[type]}   searchArguments [The Search query, in a string form, example 'how to become a programmer']
 * @param  {Function} callback        [in the form function(error, results){}]
 */
ABS.prototype.search = function search(searchArguments, page, callback) {
  if(typeof page === 'function'){
    var callback = page;
  }
  if(!this.configured){callback({message:'Not Properly Configured'},null);return;}
  if(!searchArguments){searchArguments='';}

  this.resultsHandler = function(error, results){
    if(error){callback(error, null);return};
    humanizer.transformResults(results, callback);
  };
  // TODO
  // -> End the request and force error response if it exceedes some timeout
  // -> Cache this request to answer faster or with cached results in case of timeout
  if(typeof page !== 'function'){
    this.amazon.query(searchArguments, page, this.resultsHandler );
  }else{
    this.amazon.query(searchArguments, this.resultsHandler);
  }

};

/**
 * Use this book search as a connect like middleware
 * @return {[type]} [description]
 */
ABS.prototype.middleware = function searchMiddleware(){
  var self = this;
  return function(req, res, next){
    outputCallback = function(error, response){
      if(error){
        res.send(400, error);
        return false;
      };
      res.send(200, response);
      res.end();
    };
    if(req.query.page){
      self.search(req.query.q, req.query.page, outputCallback);
    }else{
      self.search(req.query.q, outputCallback);
    }
  };
}

module.exports = ABS;
