Ingredient = require('../models/ingredient.js');

// Getting neo4j object
var neo4j = require('neo4j');

// Connection do DB
var db = new neo4j.GraphDatabase(
    process.env['NEO4J_URL'] ||
    process.env['GRAPHENEDB_URL'] ||
    'http://localhost:7474'
);

// ----------------------------------------
// Constructor
// ----------------------------------------

var ControllerIngredient = module.exports = function ControllerIngredient(_node) {
}

// use a Cypher query to delete both this Ingredient and the recipes using it.
ControllerIngredient.prototype.del = function(callback) {
    var query = [
        'MATCH (ingr:Ingredient)',
        'WHERE ID(ingr) = {ingrId}',
        'DELETE ingr',
        'WITH ingr',
        'MATCH (ingr) -[rel]- (recipe:Recipe)',
        'DELETE rel',
        'DELETE recipe'
    ].join('\n')

    var params = {
        ingrId: this.id
    };

    db.query(query, params, function (err) {
        callback(err);
    });
};

// Get the Ingredients list for a recipe
ControllerIngredient.getIngredientsOfRecipe = function(recipe_id, callback) {
    var query = [
        'MATCH (re:Recipe {index:\'' + recipe_id + '\'})-->(ingredient:Ingredient)',
        'return ingredient'
    ].join(' ')
    db.query(query, null, function(err, results) {
        if (err) return callback(err);
        var ingrs = results.map(function (result) {
            return new Ingredient(result['ingredient']);
        });
        callback(null,ingrs);
    });
}

// Get the Ingredient by ID
ControllerIngredient.getIngredients = function (id, callback) {
    db.getNodeById(id, function (err, node) {
        if (err) return callback(err);
        callback(null, new Ingredient(node));
    });
};

// Get all Ingredients
ControllerIngredient.getAll = function (callback) {
    var query = [
        'MATCH (ing:Ingredient)',
        'RETURN ing',
    ].join('\n');

    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var ingrs = results.map(function (result) {
            return new Ingredient(result['ing']);
        });
        callback(null, ingrs);
    });
};

