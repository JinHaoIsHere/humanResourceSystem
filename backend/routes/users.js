var express = require('express');
var router = express.Router();
var db = require('../db/util');
var mongoClient = require('mongodb').MongoClient;
var config = require('../config');
const bcrypt = require('../utils/bcrypt');
const auth = require('../utils/auth');
var assert = require('assert');
const { ObjectId } = require('mongodb');


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
        if(!result){
            res.json({ userToken: null });
            return;    
        }
        
        const {token, expireDate} =  auth.sign(result);
        perm = result.permission;
        //console.log(expireDate);
        res.json({ userToken: token, permission: perm, expireDate: expireDate });
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
            const checkUser = await userCollection.findOne({username: userInfo.username});
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
            if(!userInfo.permission || !Array.isArray(userInfo.permission)){
                userInfo.permission = [];
            }

            //encrypt the password
            const updatedPassword = bcrypt.hash(userInfo.password);
            const updatedInfo = {...userInfo, password: updatedPassword};
            let result = await userCollection.insert(updatedInfo);
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
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let userCollection = db.collection('users');

            const userInfo = {...req.body};
            //validate the username which should be unique
            const checkUser = await userCollection.findOne({username: userInfo.username});          

            if(checkUser && checkUser._id.toString() !== userInfo._id){
                res.status(400).json('User Existed');
                return;
            }
            delete userInfo._id; //don't have to update _id field
            //validate the password, the length should be longer than 6
            if(!userInfo.password)
                delete userInfo.password;
            else if(userInfo.password.length<6){
                res.status(400).json('Password should be longer than 6');
                return;
            }else{
                const updatedPassword = bcrypt.hash(userInfo.password);
                userInfo.password=updatedPassword;
            }
            //validate the format of email address
            const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if(userInfo.email && !emailReg.test(userInfo.email)){
                res.status(400).json('Invalid Email address');
                return;
            }
            if(!userInfo.permission || !Array.isArray(userInfo.permission)){
                userInfo.permission = [];
            }
            
            let result = await userCollection.updateOne(
                {_id: ObjectId(req.body._id)}, 
                {$set: userInfo});
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

router.get(
    '/admin/getUser',
    async function (req, res) {
        let client;
        try {
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let dCollection = db.collection('users');
            let result = await dCollection.findOne({_id: ObjectId(req.query.id)});
            if(!result){
                res.status(400).json('Wrong User ID');
            }else{
                res.json({ user: result });
            }
            
        }
        catch (err) { console.error(err); }
        finally { client.close(); }
    }
)

router.post(
    '/admin/deleteUser',
    async function (req, res) {
        let client;
        try {
            client = await mongoClient.connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db(config.db.name);
            let dCollection = db.collection('users');
            let result = await dCollection.deleteOne({_id: ObjectId(req.body.userId)});
            if(!result){
                res.status(400).json('Wrong User ID');
            }else{
                res.json('Delete successfully');
            }
            
        }
        catch (err) { console.error(err); }
        finally { client.close(); }
    }
)


module.exports = router;
