var mongoose = require('mongoose');
var db = mongoose.createConnection('10.0.0.13', 'test');

var schema = mongoose.Schema({name: 'string', age: 'number', comment: 'string'});
var Cat = db.model('Cat', schema);

var kitty = new Cat({name: 'Zildjian@' + new Date, age: 12, comment: 'built w/ create-cat script'});

kitty.save(function (err) {
    if (err)
        res.end('meow');
    db.close();
});


console.log('through');
