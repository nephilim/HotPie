
/** * Module dependencies.
 */
require('v8-profiler');
require('coffee-script');

var express = require('express'),
    RedisStore = require('connect-redis')(express)

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "ancientworldofultima",
    store: new RedisStore
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.configure('test', function(){
  app.set('port', 3001);
});

// Helpers
require('./apps/helpers')(app)

// Routes

//app.get('/', routes.index);
require('./apps/authentication/routes')(app)

app.listen(app.settings.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
