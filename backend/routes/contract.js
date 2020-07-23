var express = require('express');
var router = express.Router();
var db = require('../db/util');
var mongoClient = require('mongodb').MongoClient;
var config = require('../config');


router.post(
    '/contract/create',
    async function (req, res) {
        let client;
        try {
            client = await mongoClient.connect(
                config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let contractCollection = db.collection('contract');
            const contractInfo = req.body;
            
            //validate something, TBD
            
            
            let result = await contractCollection.insert(contractInfo);
            console.log(result);
            res.json('Created successfully');
        }
        catch (err) { console.log(err); }
        finally { client.close(); }
    }
);

router.get(
    '/contract/list',
    async function (req, res, next) {
        let client;
        try {
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);

            let dCollection = db.collection('contract');
            let result = await dCollection.find().toArray();
            res.json({ contractList: result });
        }
        catch (err) { console.error(err); }
        finally { client.close(); }
    }
);

module.exports = router;