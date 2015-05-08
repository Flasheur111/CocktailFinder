/**
 * Created by Adrien on 08/04/2015.
 */

var associateArray = {};
var associateArrayImage = {};
var vectorsArray = {};
var rotor = {};

Parser.prototype.getParseResult = function (recipeId) {
    recipeArr.push(vectorsArray[recipeId.toString()]);
    return vectorsArray[recipeId.toString()];
};

Parser.prototype.getParseRotor = function()
{
    rotorArr.push(vectorsArray["12"]);
    return rotor["12"];
}

Parser.prototype.getImageFile = function (recipeId) {
    return associateArrayImage[recipeId];
}

function parse_recipe(array) {
    for (var item in array) {
        $.ajax({
            url: array[item.toString()],
            async: false,
            dataType: "text",
            success: function (data) {
                var f = JSON.parse(data);
                var temp = f.rigidBodies[0].shapes[0].vertices;
                var vectors = [];

                for (var i = 0; i < temp.length; i++) {
                    var vector = temp[i];
                    vector.x *= glassScale;
                    vector.x = (width / METER / 2) - glassScale / 2 + vector.x;

                    vector.y *= glassScale;
                    vector.y = height / METER - 1.5 - vector.y;

                    vectors[i] = vector;
                }
                vectorsArray[item] = vectors;
            }
        });
    }
}

function parse_rotor(array) {
    for (var item in array) {
        $.ajax({
            url: array[item.toString()],
            async: false,
            dataType: "text",
            success: function (data) {
                var f = JSON.parse(data);
                var temp = f.rigidBodies[0].shapes[0].vertices;
                var vectors = [];

                for (var i = 0; i < temp.length; i++) {
                    var vector = temp[i];
                    vector.x = (width / METER / 2)+ vector.x;

                    vector.y = height / METER - 1.5 - vector.y;

                    vectors[i] = vector;
                }
                vectorsArray[item] = vectors;
            }
        });
    }
}

Parser.prototype.initParser = function () {
    parse_recipe(associateArray);
    parse_rotor(rotor);

    console.log("Parser init done");
}

function Parser() {
    associateArray["1"] = "Assets/DrinkJSON/sprite_0000_Calque-2.json";
    associateArray["2"] = "Assets/DrinkJSON/sprite_0001_Calque-3.json";
    associateArray["3"] = "Assets/DrinkJSON/sprite_0002_Calque-4.json";
    associateArray["4"] = "Assets/DrinkJSON/sprite_0003_Calque-5.json";
    associateArray["5"] = "Assets/DrinkJSON/sprite_0004_Calque-6.json";
    associateArray["6"] = "Assets/DrinkJSON/sprite_0005_Calque-7.json";
    associateArray["7"] = "Assets/DrinkJSON/sprite_0006_Calque-8.json";
    associateArray["8"] = "Assets/DrinkJSON/sprite_0007_Calque-9.json";
    associateArray["9"] = "Assets/DrinkJSON/sprite_0008_Calque-1.json";
    associateArray["10"] = "Assets/DrinkJSON/sprite_0000_Calque-2.json";
    associateArray["11"] = "Assets/DrinkJSON/sprite_0001_Calque-3.json";
    associateArray["12"] = "Assets/DrinkJSON/sprite_0002_Calque-4.json";

    associateArrayImage["1"] = "Assets/DrinkImage/sprite_0000_Calque-2.png";
    associateArrayImage["2"] = "Assets/DrinkImage/sprite_0001_Calque-3.png";
    associateArrayImage["3"] = "Assets/DrinkImage/sprite_0002_Calque-4.png";
    associateArrayImage["4"] = "Assets/DrinkImage/sprite_0003_Calque-5.png";
    associateArrayImage["5"] = "Assets/DrinkImage/sprite_0004_Calque-6.png";
    associateArrayImage["6"] = "Assets/DrinkImage/sprite_0005_Calque-7.png";
    associateArrayImage["7"] = "Assets/DrinkImage/sprite_0006_Calque-8.png";
    associateArrayImage["8"] = "Assets/DrinkImage/sprite_0007_Calque-9.png";
    associateArrayImage["9"] = "Assets/DrinkImage/sprite_0008_Calque-1.png";
    associateArrayImage["10"] = "Assets/DrinkImage/sprite_0000_Calque-2.png";
    associateArrayImage["11"] = "Assets/DrinkImage/sprite_0001_Calque-3.png";
    associateArrayImage["12"] = "Assets/DrinkImage/sprite_0002_Calque-4.png";

    rotor["13"] = "Assets/DrinkJSON/bottle.json";
    console.log("Parser created");
}

