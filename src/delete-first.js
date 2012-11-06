var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'test');

var schema = mongoose.Schema({ name: 'string' });
var Cat = db.model('Cat', schema);

Cat.find(function (err, kittens) {
    if (err) {
    } // TODO handle err
    else {
        console.log(kittens)
        console.log('deleting ' + kittens[0].name);
        kittens[0].remove();
        db.close();
    }
});

console.log('through');

db.close();

