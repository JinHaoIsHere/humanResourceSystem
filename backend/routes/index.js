// import * from './users.js';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let a =1 ;
  res.json({message: "HR System Backend"});
});

module.exports = router;

