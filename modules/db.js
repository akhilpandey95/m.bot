/*
* db for felix
* Akhil Pandey
*/

const assert = require('assert')
const mongoc = require('mongodb').MongoClient;
const config = require('../config');

function pool(callback) {
    mongoc.connect(config.mongodb.host, (err, db) => {
        assert.ok(err == null, err);
        callback(err, db)
    });
}

module.exports.query = (callback) => {
    mongoc.connect(config.mongodb.host, (err, db) => {
        assert.ok(err == null, err);
        callback(err, db)
    });
}

module.exports.insertOne = (foo) => {
    pool((err, db) => {
        db.collection('logs').insertOne(foo, (err, r) => {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            console.log(r.insertedId);
            db.close();
        });
    });
}

module.exports.insertMany = (foo) => {
    pool((err, db) => {
        db.collection('logs').insertMany(foo, (err, r) => {
            assert.equal(null, err);
            assert.equal(foo.length, r.insertedCount);
            console.log(r.insertedId);
            db.close();
        });
    });
}
