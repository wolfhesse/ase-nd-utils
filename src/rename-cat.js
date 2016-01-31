var mongoose = require('mongoose');
var db = mongoose.createConnection('10.0.0.13', 'test');

var schema = mongoose.Schema({ name: 'string' });
var Cat = db.model('Cat', schema);

Cat.find({name: 'Zildjian' }, function(err, kittens) {
    if (err) {
        console.log(err);
    }
    else {
        kitty = kittens[0];
        kitty.name = 'Renamed';
        console.log(kitty);
        kitty.save(function (err) {
            if (err)
                console.log('meow');
            db.close();
            console.log(kitty);
        });
        console.log('through');
    }
});


