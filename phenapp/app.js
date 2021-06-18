var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const bodyParser = require("body-parser");

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var obsRouter = require('./routes/observer');
var regRouter = require('./routes/registry');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'phenchild',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { path: '/', httpOnly: true, secure: true, maxAge: null }
// }))

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/observers', obsRouter);
app.use('/api/registry', regRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
