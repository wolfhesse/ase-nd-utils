// KittenEngine


'use strict';
var KittenEngineMongoose = {
    createCat: function (kittenData) {
        //kittenData = kittenData || kittenData;
        var res = "";
        var error = "";
        var ret = 0;

// logging
        var bunyan = require('bunyan');
        var log = bunyan.createLogger({
            name: 'create-cat-log',
            type: 'create-cat-script'
            // ...
        });

// data access layer
        var dal = require('./dal');
        var __dal = dal.configuration();

// model mongoose_configuration
        var model = require('./model');
        var Cat = __dal.db.model('Cat', __dal.mongoose.Schema(model.kittenSchema));

        Cat.prototype.stampFn = function () {
            return {kitty: {name: this.name, created_at: this.created_at}};
            // "Cat: name, created_at == { kitten: '" + this.name + " @ "+this.created_at+"'}";
        };

        var kitty = new Cat(kittenData.here);

        // auto-attribute
        kitty.created_at = new Date;

        kitty.save(function (err) {
            if (err) {
                res += ('meow: ' + err);
                ret = -1;
                error = err;
            } else {
                __dal.db.close();
                log.info({kitten: kitty}, 'cat saved.');
            }
        });

        log.info(kitty.stampFn(), 'kitty-stamp');

        return {kitty: kitty, res: res, ret: ret, error: error, log: log, dal: __dal, Cat: Cat};
    }
}

exports.KittenEngine=KittenEngineMongoose;