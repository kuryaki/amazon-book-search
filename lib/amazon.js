var AMAZON_API = require('apac').OperationHelper;

var self =  this;
module.exports = function(id, secret, associate){
  self.apiClient = new AMAZON_API({
    awsId:     id,
    awsSecret: secret,
    assocId:   associate || null
  });
  self.query = query;
  return self;
};

/**
 * [ Function to call Amazon API, provided by amazon]
 * @param  {[type]}   query    [search query]
 * @param  {Function} callback [callback in the form function(error, results){}]
 */
function query(query, callback){
  self.apiClient.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'Keywords': query,
    'ResponseGroup': 'ItemAttributes,Offers'
  }, function(response) {
      if(!response.ItemSearchResponse && response.ItemSearchErrorResponse){
        callback(JSON.stringify(response.ItemSearchErrorResponse.Error[0]), null);
        return;
      }
      var results = response.ItemSearchResponse.Items[0].Item;
      if(!results){
        results = [];
        callback(null, results);
        return;
      }
      callback(null, results);
  });
}