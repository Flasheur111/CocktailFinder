// ---------------------------------
// Module dependencies.
// ---------------------------------

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

// Middlewares
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

// CocktailFd Route module
var routes = require('./routes');

var app = express();

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', process.env.PORT || 3000);

// Static assets directory path parameter
app.use(express.static(path.join(__dirname, 'angular')));
app.use(express.static(path.join(__dirname, '../front')));
app.use(express.static(path.join(__dirname, '../physics')));


// Server logging, to replace with morgan.js
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override'));


// development only
if ('development' == app.get('env')) {
	app.use(errorhandler());
}


// ---------------------------------
// Routes
// ---------------------------------

// App routes

// Logger
app.get('/logger',				 	routes.site.logger);

// Bootstrap/Install routes
app.get('/bdd/rank/ingredients',	routes.bdd.rankIngredients);
app.get('/bdd/rank/recipes',		routes.bdd.rankRecipes);
app.get('/bdd/clean/',				routes.bdd.clean);
app.get('/bdd/bootstrap',			routes.bdd.bootstrap);

// Bing routes
app.get('/bing/search/:search',    routes.bing.downloadPicturesIngredients);

// Production API routes
app.get('/api/cocktails',           routes.api.findCocktails);
app.get('/api/cocktails/',          routes.api.findCocktails)
app.get('/api/cocktails/:ids', 		routes.api.findCocktails);
app.get('/api/ingredients/setColor/:ingredient/:color', routes.api.setColor);
app.get('/api/ingredients/setOpacity/:ingredient/:opacity', routes.api.setOpacity);
app.get('/api/missing', 			routes.api.findCocktailsByMissingIds);
app.get('/api/missing/', 			routes.api.findCocktailsByMissingIds);
app.get('/api/missing/:array',  	routes.api.findCocktailsByMissingIds);


// Logger
app.get('/api/recipes/', 			routes.recipes.list);
app.get('/api/recipes/:id', 		routes.recipes.find);
app.delete('/api/recipes/:id', 		routes.recipes.del);


// ---------------------------------
// Server deployment
// ---------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('-------------------------------------');
  console.log('Cocktail Finder');
  console.log('-------------------------------------');
  console.log('Server running');
  console.log('Server listening @ http://localhost:%d/', app.get('port'));
});