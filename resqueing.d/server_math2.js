var redisHost = '10.0.0.13'
var redisPort = '6379'

var jobnumber=0;

// implement your job functions.
var myJobs = {
    add: function (a, b, callback) {
        //console.log(this);
        jobnumber += 1;
        console.log("//myJobs.add: server_math got called with a, b =(" + a + ", " + b + ")");
        console.log("//myJobs.add: jobnumber is " + jobnumber);
        var res = a + b;
        if (res == 3)
            console.log("//myJobs.add: calling back callback: " + callback);
        callback(res);
    },
    //succeed: function (arg, callback) {
    //    console.log("//myJobs.succeed");
    //    console.log("//     with arg: " + arg);
    //    console.log("//     with callback: " + callback);
    //    callback();
    //},
    fail: function (arg, callback) {
        console.log("//myJobs.fail");
        callback(new Error('fail'));
    },
    doneWorking: function () {
        console.log("//myJobs.doneWorking");
    }
}

// setup a worker
var worker = require('coffee-resque').connect({
    host: redisHost,
    port: redisPort
}).worker('math2', myJobs)

// some global event listeners
//
// Triggered every time the Worker polls.
worker.on('poll', function (worker, queue) {
    //console.log('poll');
    //console.log('in queue ' + queue);
})

// Triggered before a Job is attempted.
worker.on('job', function (worker, queue, job) {
    var d = new Date;
    console.log('== worker/event: job ' + JSON.stringify(job));
    console.log('==               in queue ' + queue);
    console.log('==               @TS =  ' + d);
})

// Triggered every time a Job errors.
worker.on('error', function (err, worker, queue, job) {
    console.log('err ' + JSON.stringify(job));
    console.log('in queue ' + queue);
})

// Triggered on every successful Job run.
worker.on('success', function (worker, queue, job, result) {
    console.log('== worker/event: success ' + JSON.stringify(job));
    console.log('==               in queue ' + queue);
    console.log('==               result is ' + result);
})

//worker.on('doneWorking', function(worker, queue, job){
//    console.log('== worker/event: doneWorking');
//});
worker.start()
console.log("worker started...");
