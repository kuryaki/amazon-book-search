
module.exports.search = function search(searchArguments, callback) {
  results = [
    {
      title:'a tittle',
      author:'an author',
      publisher:'some publisher',
      publication:new Date(),
      edition:0,
      price:5,
      currency:'usd',
      format:'the format'
    }
  ];
  callback(null, results);
};