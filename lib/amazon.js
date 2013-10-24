var AMAZON_API = require('apac').OperationHelper;

var apiClient = new AMAZON_API({
  awsId:     'AKIAI6HXKAF4PMFLG65A',
  awsSecret: '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',
  assocId:   'wobonic'
});


module.exports.query = function(query, callback){
  apiClient.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'Keywords': query,
    'ResponseGroup': 'ItemAttributes,Offers'
  }, function(response) {
      var results = response.ItemSearchResponse.Items[0].Item;
      if(!results){
        results = [];
        callback(null, results);
        return;
      }
      callback(null, results);
  });
}