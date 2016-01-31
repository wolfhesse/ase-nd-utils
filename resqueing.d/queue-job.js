var redisHost = '10.0.0.13'
var redisPort = '6379'
var resque = require('coffee-resque').connect({
    host: redisHost,
    port: redisPort
});

var enqueued = function (err, remainingJobs) {
    if (err) {
        console.log('err: ' + err);
    } else
        console.log('enqueued; remainingJobs: ' + remainingJobs);
}

//resque.enqueue('math', 'add', [1,2]);
//resque.enqueue('math', 'add', [1,23]);
//resque.enqueue('math', 'add', [1,-12]);
resque.enqueue('math', 'add', [1, 2], enqueued);
resque.enqueue('math2', 'add', [1, 2], enqueued);

resque.enqueue('math', 'nulbody', [], enqueued);
resque.end();