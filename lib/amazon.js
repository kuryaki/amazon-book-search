var AMAZON_API = require('apac').OperationHelper;

function Amazon(settings){
  this.apiClient = new AMAZON_API({
    awsId:     settings.awsKey,
    awsSecret: settings.awsSecret,
    assocId:   settings.associate || 'wobonic'
  });
};
/**
 * [ Function to call Amazon API, provided by amazon]
 * @param  {[type]}   query    [search query]
 * @param  {Function} callback [callback in the form function(error, results){}]
 */
Amazon.prototype.query = function query(searchArguments, page, callback){
  var query = {
    'SearchIndex': 'Books',
    'Keywords': searchArguments,
    'ResponseGroup': 'ItemAttributes,Offers'
  }

  if(typeof page === 'function'){
    callback = page;
    page = undefined;
  }else{
    query.ItemPage = page;
  }

  if(!query.Keywords){
    output = {totalResults:0, totalPages:0, currentPage:0, results:[]};
    callback(null, output);
    return;
  }

  this.apiClient.execute('ItemSearch', query, function(response) {
    var output = {};
    if(typeof page !== 'function'){
      output.currentPage = page;
    }
    if(!response.ItemSearchResponse && response.ItemSearchErrorResponse){
      callback({message:response.ItemSearchErrorResponse.Error[0]}, null);
      return;
    }
    if('True' !== response.ItemSearchResponse.Items[0].Request[0].IsValid[0]){
      callback({message:response.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0].Message[0]}, []);
      return;
    }

    var results = response.ItemSearchResponse.Items[0].Item;
    var totalResults = response.ItemSearchResponse.Items[0].TotalResults[0];
    var totalPages = response.ItemSearchResponse.Items[0].TotalPages[0];

    if(!results){
      output = {totalResults:0, totalPages:0, currentPage:0, results:[]};
      callback(null, output);
      return;
    }
    output = {totalResults:totalResults, totalPages:totalPages, currentPage: page || 1, results:results};
    callback(null, output);
  });
}

module.exports = Amazon;
