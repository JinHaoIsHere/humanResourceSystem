var express = require('express');
var router = express.Router();
var db = require('../db/util');
var mongoClient = require('mongodb').MongoClient;
var config = require('../config');
const bcrypt = require('../utils/bcrypt');
const auth = require('../utils/auth');
router.post(
    '/login',
    async function (req, res, next) {
        
        client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(config.db.name);
        let dCollection = db.collection('users');
        let result = await dCollection.findOne(req.body);
        // console.log(result);
        let token=null;
        if(result){
            token = auth.sign(result);
        }
        res.json({ userToken: token });
    }
);


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
    '/admin/createUser',
    async function (req, res) {
    }
)

module.exports = router;