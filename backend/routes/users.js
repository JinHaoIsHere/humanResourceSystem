var express = require('express');
var router = express.Router();
var db = require('../db/util');
var mongoClient = require('mongodb').MongoClient;
var config = require('../config');

router.get(
    '/admin/usersList',
    async function (req, res, next) {
        let client;
        try {
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            
            let dCollection = db.collection('users');
            let result = await dCollection.find().toArray();
            res.json({ userslist: result });
        }
        catch (err) { console.error(err); }
        finally { client.close(); }
    }
);

router.post(
    '/admin/createUer',
    async function(req, res){
        
    }
)

module.exports = router;