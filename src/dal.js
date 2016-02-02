
function mongoose_configuration() {
    var mongoose = require('mongoose');
    var config = require('./config');

    var db = mongoose.createConnection(config.mongo.development.host, config.mongo.development.db);
    return {mongoose: mongoose, config: config, db: db};
}

exports.configuration = mongoose_configuration;