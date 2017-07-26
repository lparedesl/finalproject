var express        = require("express");
var path           = require("path");
var favicon        = require("serve-favicon");
var logger         = require("morgan");
var cookieParser   = require("cookie-parser");
var bodyParser     = require("body-parser");
var expressHbs     = require("express-handlebars");
var session        = require("express-session");
var passport       = require("passport");
var flash          = require("connect-flash");
var validator      = require("express-validator");
// var db             = require("./models");
// var SequelizeStore = require('connect-session-sequelize')(session.Store);

// require("./associations")(db);
require("./config/passport");

var index = require('./routes/index');

var app = express();

// var sessionStore = new SequelizeStore({
//     db: db.sequelize,
//     checkExpirationInterval: 15 * 60 * 1000,
//     expiration: 3 * 3600 * 1000
// });

// view engine setup
app.engine(".hbs", expressHbs({
    defaultLayout: "layout",
    extname: ".hbs"
}));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
app.use(validator());
app.use(cookieParser());
// app.use(session({
//     secret: "mysecret",
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore
// }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

// sessionStore.sync();

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
