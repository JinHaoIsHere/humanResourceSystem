var express = require('express');
var router = express.Router();
var db = require('../db/util');
var mongoClient = require('mongodb').MongoClient;
var config = require('../config');
const { ObjectId } = require('mongodb');

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


router.post(
    '/contract/update',
    async function (req, res) {
        let client;
        try {
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let userCollection = db.collection('contract');
            const contractInfo = {...req.body};
            delete contractInfo._id;            
            //validate something, TBD

            
            let result = await userCollection.updateOne(
                {_id: ObjectId(req.body._id)}, 
                {$set: contractInfo});
            if(!result){
                res.status(400).json('Update failed');
            }else{
                if(result.result.ok){
                    res.json('Update Completed');
                }else{
                    res.status(400).json('Update failed');
                }
            }
            
        }
        catch (err) { console.log(err); }
        finally { client.close(); }
    }
)

router.post(
    '/contract/delete',
    async function (req, res) {
        let client;
        try {
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let dCollection = db.collection('contract');
            let result = await dCollection.deleteOne({_id: ObjectId(req.body.contractId)});
            if(!result){
                res.status(400).json('Wrong Contract ID');
            }else{
                res.json('Delete successfully');
            }
            
        }
        catch (err) { console.error(err); }
        finally { client.close(); }
    }
)

module.exports = router;