var express = require('express');
var router = express.Router();
var db = require('../db/util');
var mongoClient = require('mongodb').MongoClient;
var config = require('../config');
const bcrypt = require('../utils/bcrypt');
const auth = require('../utils/auth');
var assert = require('assert');


router.post(
    '/login',
    async function (req, res, next) {

        client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(config.db.name);
        let dCollection = db.collection('users');
        let result = await dCollection.findOne({username: req.body.username});
        if(!result){
            res.status(400).json('User not existed');
            return;
        }
        if(!bcrypt.compare(req.body.password, result.password)){
            res.status(400).json('Wrong password');
            return
        }
        // console.log(result);
        let token = null;
        let perm = [];
        if (result) {
            token = auth.sign(result);
            perm = result.permission;
        }
        res.json({ userToken: token, permission: perm });
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
        let client;
        try {
            client = await mongoClient.connect(
                config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let userCollection = db.collection('users');
            const userInfo = req.body;
            //validate the username which should be unique
            const checkUser = await userCollection.findOne({...userInfo.username});
            console.log(checkUser);
            if(checkUser){
                res.status(400).json('User Existed');
                return;
            }
                
            //validate the password, the length should be longer than 6
            if(!userInfo.password || userInfo.password.length<6){
                res.status(400).json('Password should be longer than 6');
                return;
            }
            //validate the format of email address
            const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if(userInfo.email && !emailReg.test(userInfo.email)){
                res.status(400).json('Invalid Email address');
                return;
            }
            //encrypt the password
            const updatedPassword = bcrypt.hash(userInfo.password);
            const updatedInfo = {...userInfo, password: updatedPassword};
            let result = await userCollection.insert(updatedInfo);
            console.log(result);
            res.json('Created successfully');
        }
        catch (err) { console.log(err); }
        finally { client.close(); }
    }
);

router.post(
    '/admin/updateUser',
    async function (req, res) {
        let client;
        try {
            client = await mongoClient.connect(
                config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);

            db.open((err, db) => {
                assert.equal(null, err);
                db.addUser('username', 'firstname', 'email', 'lastname', 'password', 'title', 'permission', 'phone', 'role', 'address', (err, res) => {
                    assert.equal(null, err);
                    db.removeUser('user', (err, res) => {
                        db.authenticate('email', (err, res) => {
                            assert.equal(false, res);
                            db.close();
                        });
                    });
                });
            });
        }
        catch (err) { console.log(err); }
        finally { client.close(); }
    }
)

module.exports = router;