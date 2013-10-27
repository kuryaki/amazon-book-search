var ABS = require('../.');

var abs = new ABS({awsKey:process.argv[2],awsSecret:process.argv[3]});
abs.configure({awsKey:process.argv[2],awsSecret:process.argv[3]});

abs.search('your thoughts on books', function(error, response){
  console.log(response.results);
});