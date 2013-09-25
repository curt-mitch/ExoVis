var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// Configuration
require('./config/db.js')(app);

// Controllers
var systems = require('./controllers/systems.js');

// Middleware
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/systems/:star', systems.getSystem);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
