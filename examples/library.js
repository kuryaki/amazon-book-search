var abs = require('../.');

// abs.configure({awsKey:'awsKey',awsSecret:'awsSecret'});
abs.configure({awsKey:process.argv[2],awsSecret:process.argv[3]});

abs.search('your thoughts on books', function(error, responses){
  console.log(responses);
});