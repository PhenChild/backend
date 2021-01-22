const {PrismaClient } = require('@prisma/client');  
exports.prisma = new PrismaClient();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var estacionesRouter = require('./routes/estaciones');
var observadoresRouter = require('./routes/observador');
var variableRouter = require('./routes/variable');
var horarioRouter = require('./routes/horario');
var variablePorEstacionRouter = require('./routes/variableEstacion');
var registroRouter = require('./routes/registro');

var app = express();

var corsOptions = {origin: "http://localhost:4200"};
app.use(cors(corsOptions)); 

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({​​​​​​​​extended: true}​​​​​​​​));
app.use(bodyParser.urlencoded({extended:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/estaciones', estacionesRouter);
app.use('/observadores', observadoresRouter);
app.use('/variable', variableRouter);
app.use('/horario', horarioRouter);
app.use('/variablePorEstacion', variablePorEstacionRouter);
app.use('/registro', registroRouter);

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