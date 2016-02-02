// start-with: npm run-script start

var requestCount = 0;
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'server',

    // ...
});

var express = require('express');
var errorHandler = require('errorhandler');

var fs = require('fs');
var app = express();
var Liquid = require("liquid-node");
var lqEngine = new Liquid.Engine();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
//app.configure('development', function() {
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
}
//)
;
if ('production' == env) {
//app.configure('production', function() {
    app.use(errorHandler());
}
//)
;

log.info("__dirname: %s ", __dirname);

// bower install material-design-lite --save
app.use('/bower_components',  express.static(__dirname + '/../bower_components'));

app.get('/', function (req, res) {
    requestCount++;
    log.info({req: req}, 'received request');
    res.contentType('text/javascript');
    f = fs.readFile('./src/kittens.json', 'utf8', function (err, data) {
        if (err) { // TODO handle that
        }
        res.send(data);
    });

//    res.send('Hello World');
});

app.get('/kittens.csv', function (req, res) {
    requestCount++;
    res.contentType('text/csv');
    f = fs.readFile('./src/kittens.csv', 'utf8', function (err, data) {
        if (err) {
            // TODO handle that
        }
        res.send(data);
    });
});

app.get('/kittens', function (req, res) {
    requestCount++;
    log.info({requestCount: requestCount}, 'received kittens request %d, rendering liquid template', requestCount);

    templateReader = fs.readFile('./src/kittens.lq', 'utf8', function (err, templateF) {
        if (err) {
            // TODO handle that
        }
        log.info({requestCount: requestCount, templateLength: templateF.length}, 'template file read');

        dataReader = fs.readFile("./src/kittens.json", 'utf8', function (err, data) {
            if (err) {
                // TODO handle that
            }
            var jsonKittens = JSON.parse(data);
            log.info({requestCount: requestCount, dataLength: jsonKittens.kittens.length}, 'kittens data loaded');
            lqEngine.parse(templateF).then(function (template) {
                return template.render({date: new Date, kittens: jsonKittens.kittens});
            }).then(function (result) {
                res.end(result);
            });
        });
    });
});


var port = process.env.PORT || 32000;
//app.listen(port,'0.0.0.0', function () {
app.listen(port, function () {
    console.log("Listening on " + port);
});
