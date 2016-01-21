var fs = require('fs');
var mongoose = require('mongoose');
var db = mongoose.createConnection('10.0.0.13', 'test');

var schema = mongoose.Schema({ name: 'string' });
var Cat = db.model('Cat', schema);

nl = function (s) {
    s.write("\n");
}
Cat.find(function (err, kittens) {
    if (err) {
        console.log(err)
    }
    else {
        // write kittens to file

        var s = fs.createWriteStream('kittens.csv', {flags:'w'});
        s.write('name');
        nl(s);
        kittens.forEach(function(k) {
            s.write(k.name);
            nl(s);
        });
        s.end();
        s = fs.createWriteStream('kittens.json', {flags:'w'});
        s.end(JSON.stringify({'kittens':kittens}));
        console.log('wrote kittens files');
        db.close();
    }
});

console.log('through');
