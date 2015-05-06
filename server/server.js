// ---------------------------------
// Module dependencies.
// ---------------------------------

var express = require('express');
var http = require('http');
var path = require('path');

// CocktailFd Route module
var routes = require('./routes');

var app = express();

// ---------------------------------
// ENV setup
// ---------------------------------

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());

// Static assets directory path parameter
app.use(express.static(path.join(__dirname, 'angular')));
app.use(express.static(path.join(__dirname, '../front')));
app.use(express.static(path.join(__dirname, '../physics')));


// Server logging, to replace with morgan.js
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals({
    title: 'Cocktail Finder'    // default title
});

// ---------------------------------
// Routes
// ---------------------------------

// App routes
app.get('/',				 		routes.site.index);

// Bootstrap/Install routes
app.get('/bdd/rank/ingredients',	routes.bdd.rankIngredients);
app.get('/bdd/rank/recipes',		routes.bdd.rankRecipes);
app.get('/bdd/clean/',				routes.bdd.clean);
app.get('/bdd/boostrap/',			routes.bdd.bootstrap);

// API routes
app.get('/api/cocktails', 			routes.api.findFiveRandomCocktails);
app.get('/api/allcocktails',        routes.api.allCocktails);
app.get('/api/cocktail/id/:id', 	routes.api.findCocktalById);
app.get('/api/cocktail/name/:name', routes.api.findCocktalByName);
app.get('/api/missing/', 			routes.api.findCocktailsByMissingIds);
app.get('/api/missing/:array',  	routes.api.findCocktailsByMissingIds);
app.get('/api/ingredients',         routes.api.allIngredients);

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

