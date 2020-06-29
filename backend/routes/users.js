var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var router = express.Router();



router.get(
    '/admin/usersList',

    function(req, res, next){
        dbName='hrdb';
        mongoClient.connect('mongodb://localhost:27017', function (err, client) {
            var db = client.db('hrdb');
            db.collection('users', function (err, collection) {
                 collection.find().toArray(function(err, items) {
                    if(err) throw err;    
                    console.log(items);       
                    res.json({userslist:items});     
                });
                
            });
                        
        });

    }
  );
  
module.exports = router;