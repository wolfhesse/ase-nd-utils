var fs = require('fs');
var mongoose = require('mongoose');

var config = require('./config');
var db = mongoose.createConnection(config.mongo.development.host, config.mongo.development.db);


var model = require('./model');

var schema = mongoose.Schema(model.schema_cat_0_def.schemaCatDefinition);
var Cat = db.model('Cat', schema);

nl = function (s) {
    s.write("\n");
};

Cat.find(function (err, kittens) {
    if (err) {
        console.log(err)
    }
    else {
        // write kittens to file

        var s = fs.createWriteStream('kittens.csv', {flags: 'w'});
        s.write('name');
        nl(s);
        kittens.forEach(function (k) {
            s.write(k.name);
            nl(s);
        });
        s.end();
        s = fs.createWriteStream('kittens.json', {flags: 'w'});
        s.end(JSON.stringify({'kittens': kittens}));
        console.log('wrote kittens files');
        db.close();
    }
});

console.log('through');
