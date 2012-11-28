
// replace after an hour, goto https://developers.facebook.com/tools/explorer/
//  .. use https://developers.facebook.com/tools/debug/access_token
ACCESS_TOKEN = 'AAACEdEose0cBAClvu9zaiXt4FsZCZBEGgDSDn6lZCXNXLNH7q2XG649wyuUjYa8T6DZBpXcuC0BVPVlie9iLyxNzFteF1kmKg8iGRhsuzwZDZD';


var fs = require("fs");
var rest = require("./myrest");
var EventEmitter = require('events').EventEmitter;


var LineTracker = exports.LineTracker = function(options) {
    this.options = options;
    this.o = 'id |name |email' + "\n"
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

                // write to file

                tracker.len = result.data.length;
                tracker.emit('result',result);
                tracker.counter = 0;
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
    opt_here.path = '/'+bucket.id+'?fields=id,username&limit=5000' + '&access_token=' + ACCESS_TOKEN;
    var line = bucket.id + " |" + bucket.name;
    rest.getJSON(opt_here,
        function(statusCode, options, result){
            console.log("statusCode for "+ bucket.id+" was "+statusCode);
            if(200 == statusCode) {
                console.log(JSON.stringify(result));
                line += " |" + ( result.username ? result.username : 'none' );
                line += "\n";
                console.log("line is: " + line);
                tracker.emit("line", line);
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
    path: '/me/friends?fields=id,name&limit=500' + '&access_token=' + ACCESS_TOKEN,
    method: 'GET',
    headers: {
     'Content-Type': 'application/json'
 }
};

var linetracker = new LineTracker(options);


linetracker.on('result', function(result){
    console.log('on result for '+ this.len + ' records');
    fs.writeFile('./result.json', JSON.stringify(result), function(err){});
});


linetracker.on('line', function(line, is_last) {
    console.log('on line for record number '+ (++this.counter));
    this.o += line;
//    console.log('line processed, o is ' + this.o);
    if(this.len == this.counter) {
        console.log('tracker emits fin');
        tracker.emit('fin'); 
    } else {
        console.log('not last line, yet');
    }
});

linetracker.run().on("fin", function(){
    console.log('on fin');
    fs.writeFile('./result.names.txt',this.o, function(err){});
})
