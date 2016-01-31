var mongoose = require('mongoose');
var db = mongoose.createConnection('10.0.0.13', 'test');

var schema = mongoose.Schema({ name: 'string' });
var Cat = db.model('Cat', schema);

var kitty = new Cat({ name: 'Zildjian@' + new Date });

kitty.save(function (err) {
    if (err)
        res.end('meow');
    db.close();
});


console.log('through');
