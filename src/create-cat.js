var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.mongo.development.host, config.mongo.development.db);

var Cat = db.model('Cat', mongoose.Schema(config.schemaDefinitions.schema_cat_1));

var kitty = new Cat({name: 'Zildjian @ ' + new Date, age: 12, comment: 'built w/ create-cat script'});

kitty.save(function (err) {
    if (err)
        res.end('meow');
    db.close();
});


console.log('through');
