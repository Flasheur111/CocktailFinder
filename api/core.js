// ---------------------------------
// Module dependencies.
// ---------------------------------

var express         = require('express');
var http            = require('http');

// Middlewares
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var errorhandler    = require('errorhandler');
var nodeCache       = require('node-cache');

// CocktailFd Route module
var routes          = require('./routes');

var app             = express();
var myCache         = new nodeCache({stdTTL: 600, checkperiod: 660});

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', process.env.PORT || 3000);

// CORS Control for remote API cases
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.status(200).end();
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Logging Middleware
morgan.token('cached', function getId(req) {
  return req.cached;
})
app.use(morgan(':method :url :status :response-time ms - :cached'));


// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}

// ---------------------------------
// Routes
// ---------------------------------
app.get('/api/missing', 			      routes.findCocktailsByMissingIds);
app.get('/api/missing/:array', function(req, res, next){
    value = myCache.get(req.params.array);
    if (value == undefined){
      next();
    } else {
      req.cached = "FROM CACHE";
      res.json(value);
    }
},
routes.findCocktailsByMissingIds,
function(req, res){
    var constructArray = null;
    if (req.params.array) {
        constructArray = req.params.array.split(',');
    }
    if (constructArray.length <= 15) {
        req.cached = "CACHING";
        myCache.set(req.params.array, res.locals.result, 10000);
    } else {
        req.cached = "TOO LONG";
    }
});

// ---------------------------------
// Server deployment
// ---------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('-------------------------------------');
  console.log('Cocktail Finder - Production');
  console.log('-------------------------------------');
  console.log('Worker running');
  console.log('Worker listening @ http://localhost:%d/', app.get('port'));
});