
// replace after an hour, goto https://developers.facebook.com/tools/explorer/
//  .. use https://developers.facebook.com/tools/debug/access_token
ACCESS_TOKEN = 'AAACEdEose0cBAKYrhGspau8pr1sVbA6DV7NTKVtoLqBagaBEwU7nKvClEOmcld4K5buUZCJXhwLRUnfqPBzFP4Xa3tgk3ZBUZC3hsZChpQZDZD';
LIMIT = 5000;

var fs = require("fs");
var rest = require("./myrest");
var EventEmitter = require('events').EventEmitter;


var LineTracker = exports.LineTracker = function(options) {
    this.options = options;
    this.o = 'id |name |username' + "\n"
}

LineTracker.prototype = new EventEmitter;

LineTracker.prototype.run = function() {
    tracker = this;
    rest.getJSON(options,
        function(statusCode, options, result) /* onResult */
        {
            // I could work with the result html/json here.  I could also just return it
            //console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            if(200 == statusCode) {

                tracker.emit('result',result);
                tracker.counter = result.data.length;
                result.data.forEach(function(bucket){
                    console.log('calling track for bucket: ' + bucket.name);
                    tracker.track(bucket);
                });
            

            } else {
                console.log("non-200 statusCode: " + statusCode)

            }


        });

    return this;   
}

LineTracker.prototype.track = function bucket(bucket) {

    tracker = this;
    console.log('bucket with '+bucket.name)

    var opt_here = this.options;
    opt_here.path = '/'+bucket.id+'?fields=id,username&limit=' + LIMIT + '&access_token=' + ACCESS_TOKEN;
    var line = bucket.id + " |" + bucket.name;
    rest.getJSON(opt_here,
        function(statusCode, options, result){
            console.log("statusCode for "+ bucket.id+" was "+statusCode);
            if(200 == statusCode) {
                console.log(JSON.stringify(result));
                line += " |" + ( result.username ? result.username : 'none' );
                line += "\n";
                console.log("line is: " + line);
                tracker.emit("line", line,
                    function(){
                        if(--tracker.counter -1) {
                            console.log('tracker emits fin');
                            tracker.emit('fin'); 
                        } else {
                            console.log('not last line, yet');
                        }
                    });
            } else {
                console.log("non-200 statusCode: " + statusCode);
            }
        });
    return this;
}


// ============

var options = {
    host: 'graph.facebook.com',
    port: 443,
    path: '/me/friends?fields=id,name&limit=' + LIMIT + '&access_token=' + ACCESS_TOKEN,
    method: 'GET',
    headers: {
     'Content-Type': 'application/json'
 }
};

var linetracker = new LineTracker(options);


linetracker.on('result', function(result){
    console.log('on result for '+ this.len + ' records');
    fs.writeFile('./model/result.json', JSON.stringify(result), function(err){});
});


linetracker.on('line', function(line, cbfunc) {
    console.log('records left: '+ (this.counter));
    this.o += line;
//    console.log('line processed, o is ' + this.o);
    cbfunc();
});

linetracker.run().on("fin", function(){
    console.log('on fin');
    fs.writeFile('./model/result.names.txt',this.o, function(err){});
})


/* lesson learnt
    use fugue to run you app code - in production environment, b/c of tcp linger
    https://github.com/pgte/fugue
*/
// std block abend protection
process.on("uncaughtException", function(err){
    console.warn("caught unhandled exception: ")
    console.warn(err.stack || err)
})