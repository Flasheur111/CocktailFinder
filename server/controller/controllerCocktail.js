var request = require("request");

var ControllerCocktail = module.exports = function ControllerCocktail(_node) {
};

function cypher(query, cb) {
    console.log(query)
    var txUrl = "http://localhost:7474/db/data/transaction/commit";
    request.post({
            uri: txUrl,
            json: {statements: [{statement: query}]}
        },
        function (err, res) {
            cb(err, res.body)
        })
}

ControllerCocktail.getCocktails = function (ids, callback) {
    var query = 'MATCH (rec:Recipient)-[]-(re:Recipe)-[r]-(i:Ingredient) ';
    if (ids) {
        query += "WHERE ";
        for (var id_index = 0; id_index < ids.length; id_index++) {
            if (id_index < ids.length - 1)
                query += 're.index="' + ids[id_index] + '" OR ';
            else
                query += 're.index="' + ids[id_index] + '" ';

        }
    }
    query += 'RETURN re.index, ' + // 0
    '       re.name, ' + // 1
    '       i.index, ' + // 2
    '       i.name, ' + // 3
    '       i.colors, ' + // 4
    '       r.quantity, ' + // 5
    '       r.unity, ' + // 6
    '       rec.index,' + // 7
    '       i.selectedColor,' + // 8
    '       i.opacity'; //9
    var cb = function (err, data) {
        if (err)
            return callback(err,null);
        var data_formatted = {cocktails: []};
        var current_cocktail = null;
        if (data && data.results[0] && data.results[0].data) {
            if (data.results[0].data.length > 0) {
                for (var i = 0; i < data.results[0].data.length; i++) {
                    var row_array = data.results[0].data[i].row;
                    if (current_cocktail != null && row_array[1] != current_cocktail.name) {
                        data_formatted.cocktails.push(current_cocktail);
                        current_cocktail = null;
                    }
                    if (current_cocktail == null) {
                        current_cocktail = {
                            index: row_array[0],
                            name: row_array[1],
                            recipe_index: row_array[7],
                            ingredient: []
                        };
                    }

                    current_cocktail.ingredient.push({
                        index: row_array[2],
                        quantity: row_array[5],
                        unity: row_array[6],
                        name: row_array[3],
                        colors: row_array[4],
                        opacity: row_array[9],
                        selectedColor: '#' + row_array[8]
                    });
                }
                data_formatted.cocktails.push(current_cocktail);
            }
        }
        callback(null, data_formatted);
    };
    cypher(query, cb);
}

ControllerCocktail.getCocktailByExcludeIngredients = function (idIngredients, callback) {
    var query1 = 'MATCH (r:Recipe)';
    var query2 = '';
    if (!idIngredients) {
        query1 += ' ';
    } else {
        query1 += ', ';
        for (var i = 0; i < idIngredients.length; ++i) {
            if (i == idIngredients.length - 1) {
                query1 += '(i' + i + ':Ingredient { index:"' + idIngredients[i] + '" }) ';
                query2 += 'NOT r--i' + i + ' ';
            } else {
                query1 += '(i' + i + ':Ingredient { index:"' + idIngredients[i] + '" }), ';
                query2 += 'NOT r--i' + i + ' AND ';
            }
        }
        query1 += 'WHERE '
    }
    query2 += 'RETURN r.index, r.name ORDER BY r.recipeScore DESC LIMIT 5';
    var query = query1 + query2;
    var cb = function (err, data) {
        var index_list = [];
        for (var i = 0; i < data.results[0].data.length; i++) {
            var row_array = data.results[0].data[i].row;
            index_list.push(row_array[0]);
        }
        ControllerCocktail.getCocktails(index_list, callback);
    };
    cypher(query, cb);
}