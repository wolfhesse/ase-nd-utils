var redisHost='localhost'
var redisPort='6379'
var resque = require('coffee-resque').connect({
  host: redisHost,
  port: redisPort
});

var thankyou = function(something){
    console.log('thankyou with ' + something);
}

resque.enqueue('math', 'add', [1,2]);
resque.enqueue('math', 'add', [1,23]);
resque.enqueue('math', 'add', [1,-12]);
resque.enqueue('math', 'add', [1,2]);
resque.end();