var MongoClient = require('mongodb').MongoClient;

//mongodb connection object
mongoConn = function(callback){
    MongoClient.connect('mongodb://localhost:27017/accion', function(err, db) {
        callback(err,db);
    });
};

module.exports = {
    mongoConn:mongoConn
}