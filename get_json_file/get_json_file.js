
// logging
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'get-json-file',
    type: 'utility-script'
    // ...
});


http = require('http');
var url_ypipe_deprecated = "http://pipes.yahoo.com/pipes/pipe.run?_id=e0a190bee0573e91740241d548c68bcf&_render=json";
var url = "http://localhost:32000/"; // use local kittens json server

http.get(url, function (res) {
    var body = '';
    log.info({statusCode:res.statusCode, headers:res.headers},"Got response");
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk
        log.info('BODY: chunk received');
    });
    res.on('end', function () {
        log.info({body: body},'complete body');
        out_file = require('fs');
        out_file.writeFile('result.json', body);
    });

    res.on('error', function (e) {
        log.error("Got error: " + e.message);
    });
});
