'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    session = require('express-session'),
    passport = require('passport'),
    compress = require('compression'),
    cookieParser = require('cookie-parser');

var app = module.exports = exports.app = express();

app.locals.siteName = 'plat';

// Should be placed before express.static
app.use(compress({
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

// Connect to database
var db = require('./config/db');
app.use(express.static(__dirname + '/.tmp'));
app.use(express.static(__dirname + '/public'));


// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

if ('development' == env) {
    app.use(morgan('dev'));
    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.set('view options', {
        pretty: true
    });
}

if ('test' == env) {
    port = 9997;
    app.use(morgan('test'));
    app.set('view options', {
        pretty: true
    });
    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
}

if ('production' == env) {
    app.use(morgan());
     app.use(errorhandler({
        dumpExceptions: false,
        showStack: false
    }));
}

require('./config/passport')();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(methodOverride());
app.use(bodyParser());


app.use(cookieParser());


    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'secret', //config.sessionSecret,
        /*store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })*/
    }));
    //app.use(session({secret: '1234567890QWERTY'}));
    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());




// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});

// Start server
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
