var express = require('express');
var fs = require('fs');

var app = express();
app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});


app.get('/', function(req, res) {
    res.contentType('text/javascript');
    f = fs.readFile('kittens.json', 'utf8', function(err, data) {
        if (err) { // TODO handle that
        }
        res.send(data);
    });

//    res.send('Hello World');
});

app.get('/kittens.csv', function(req, res) {
    res.contentType('text/csv');
    f = fs.readFile('kittens.csv', 'utf8', function(err, data) {
        if (err) {
            // TODO handle that
        }
        res.send(data);
    });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
