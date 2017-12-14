// mongodb driver
var mongoClient = require('mongodb').MongoClient;
let password = process.env.DB_PASSWD;
var connection_string = 'mongodb://application:'+password+'@ds113636.mlab.com:13636/similitude';

var mongoDB;

// Connect to the db
mongoClient.connect(connection_string, function(err, db){
    if (err) doError(err);
    console.log("Connected to MongoDB server!");
    mongoDB = db;
});

exports.create_plan = function (name, pay, job, callback){
    let data = {"name": name, "pay": pay, "job": job};
    mongoDB.collection('plan').find({"name":name}).limit(1).toArray(function(err, docs) {
        // don't add if already exists
        if (docs.length > 0) {
            console.log('already exists');
            callback(false);
        } else {
            // async check if inserted
            mongoDB.collection('plan').insertOne(data, function(err, status) {
                if (err) doError(err);
                var success = (status.result.n == 1 ? true: false);
                callback(success);
            });        
        }
    });
};

exports.update_job = function (name, job, callback){
    mongoDB.collection('plan').find({"name":name}).limit(1).toArray(function(err, docs) {
        // make sure plan exists
        if (docs.length < 1) {
            console.log('plan does not exist');
            callback(false);
        } else {
            // async update the job
            mongoDB.collection('plan').update({"name":name}, {$set: {"job":job}}, function(err, status) {
                if (err) doError(err);
                var success = (status.result.n == 1 ? true: false);
                callback(success);
            });
        }
    });
};


exports.update_house = function (name, house, callback){
    mongoDB.collection('plan').find({"name":name}).limit(1).toArray(function(err, docs) {
        if (docs.length < 1) {
            console.log('plan does not exist');
            callback(false);
        } else {
            mongoDB.collection('plan').update({"name":name}, {$set: {"house":house}}, function(err, status) {
                if (err) doError(err);
                var success = (status.result.n == 1 ? true: false);
                callback(success);
            });
        }
    });
};

// Find all plans
exports.retrieve_plans = function (callback) {
    mongoDB.collection('plan').find({}, { name: 1, job: 1, pay: 1, _id: 1 }).toArray(function(err, docs) {
        if (err) doError(err);
        callback(docs);
    });
};

// retrieve specific plan
exports.retrieve_plan = function (name, callback) {
    mongoDB.collection('plan').find({"name": name}, { name: 1, job: 1, pay: 1, _id: 0 }).toArray(function(err, docs) {
        if (err) doError(err);
        callback(docs);
    });
};

// delete specific plan
exports.delete_plan = function (name, callback) {
    mongoDB.collection('plan').remove({"name": name}, function(err, result) {
        if (err) doError(err);
        callback(true);
    });
}

// throwing error
var doError = function(e) {
    console.error("ERROR: " + e);
    throw new Error(e);
};