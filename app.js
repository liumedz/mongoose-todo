
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var i18n = require('i18next');
var crypto = require('crypto');



mongoose.connect('mongodb://localhost/express-todo');

var db = require('./db')(mongoose, crypto);
var isAuthenticatedPolicy = require('./policies/is-authenticated')();


var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser("nongoosetodocookie"));
var localize = require('./policies/localize');


i18n.init({
    saveMissing: true,
    locales:['en', 'de', 'lt'],
    debug: true,
    directory: __dirname + '/config/locales'
});


app.use(express.session({
    secret: 'nongoosetodocookie',
    cookie: { maxAge: 86400000 },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional
        host: 'localhost', // optional
        port: 27017, // optional
        db: 'test', // optional
        collection: 'sessions', // optional
        expire: 86400000 // optional
    })
}));

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(isAuthenticatedPolicy.apply);
var secureRoutes = require('./infrastructure/secure-routes')(app);
var routesMap = require('./config/routes-map')(secureRoutes, db, crypto);


app.use(i18n.handle);
app.use(localize);
app.use(app.router);
i18n.registerAppHelper(app);
app.locals.i18n = i18n;

routesMap.map();



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
