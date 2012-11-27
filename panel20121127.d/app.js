console.log ('ho');

// replace after an hour, goto https://developers.facebook.com/tools/explorer/
//  .. use https://developers.facebook.com/tools/debug/access_token
var access_token = 'AAACEdEose0cBACA89a4QYkLG7kk2kR9xMod58EfoCOas7LcqyOYlppVVbViK4wFrDJHHmQ1QXJLNZAgVz4apdTUC4FIPlmGS0xlApcQZDZD';

var graph_url = "https://graph.facebook.com/me/friends?fields=id,name,link"

var fs = require("fs");
var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

// exports.getJSON = function(options, onResult)
getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};
	


var options = {
    host: 'graph.facebook.com',
    port: 443,
    path: '/me/friends?fields=id,name,email&limit=5000' + '&access_token=' + access_token,
    method: 'GET',
    headers: {
 	   'Content-Type': 'application/json'
	}
};

//rest.
getJSON(options,
        function(statusCode, result)
        {
            // I could work with the result html/json here.  I could also just return it
            //console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));

            // write to file
            fs.writeFile('./result.json', JSON.stringify(result), function(err){});

            o = 'id|name' + "\n"
            result.data.forEach(function(bucket){
            	console.log(bucket.name);
            	o += bucket.id + "|" + bucket.name + "|" + bucket.link + 
            		"\n";
            });
            // console.log(result.data[1]);

            fs.writeFile('./result.names.txt',o, function(err){});
////            res.statusCode = statusCode;
////            res.send(result);
        });

//  var req = http.get(options, function(res) {
  //   var pageData = "";
  //   res.setEncoding('utf8');
  //   res.on('data', function (chunk) {
  //     pageData += chunk;
  //   });

  //   res.on('end', function(){
  //     response.send(pageData)
  //   });
  // });

// write to json file

// interface
// impl
// testing

