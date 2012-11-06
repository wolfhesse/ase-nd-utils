var redisHost = 'localhost'
var redisPort = '6379'

// implement your job functions.
var myJobs = {
    add: function(a, b, callback) {
        callback(a + b);
    },
    succeed: function(arg, callback) {
        callback();
    },
    fail: function(arg, callback) {
        callback(new Error('fail'));
    }
}

// setup a worker
var worker = require('coffee-resque').connect({
    host: redisHost,
    port: redisPort
}).worker('math', myJobs)

// some global event listeners
//
// Triggered every time the Worker polls.
worker.on('poll', function(worker, queue) {
    console.log('poll');
    console.log('in queue ' + queue);
})

// Triggered before a Job is attempted.
worker.on('job', function(worker, queue, job) {
    console.log('job ' + JSON.stringify(job));
    console.log('in queue ' + queue);
})

// Triggered every time a Job errors.
worker.on('error', function(err, worker, queue, job) {
    console.log('err ' + JSON.stringify(job));
    console.log('in queue ' + queue);
})

// Triggered on every successful Job run.
worker.on('success', function(worker, queue, job, result) {
    console.log('success ' + JSON.stringify(job));
    console.log('in queue ' + queue);
    console.log('result is ' + result);
})

worker.start()