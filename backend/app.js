var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contractRouter = require('./routes/contract');
var cors = require('cors');
var expressJWT = require('express-jwt');
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var auth = require('./utils/auth');
app.use(expressJWT({
    secret: auth.publicKey,
    algorithms: ['RS256']
}).unless({
    path: ['/api/login']
}));
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized: invalid token...');
    }
});

// app.use((req, res, next) => { //not completed yet
//     req.db = db;
//     next();
//   });

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api', contractRouter);

module.exports = app;
