http = require('http');
var url_ypipe_deprecated = "http://pipes.yahoo.com/pipes/pipe.run?_id=e0a190bee0573e91740241d548c68bcf&_render=json";
var url = "http://localhost:32000/"; // use local kittens json server

http.get(url, function (res) {
    var body = '';
    console.log("Got response: " + res.statusCode);
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk
        console.log('BODY: chunk received');
    });
    res.on('end', function () {
        console.log('BODY: ' + body);
        out_file = require('fs');
        out_file.writeFile('result.json', body);
    });

    res.on('error', function (e) {
        console.log("Got error: " + e.message);
    });
});
