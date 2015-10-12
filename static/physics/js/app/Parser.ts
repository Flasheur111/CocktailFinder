/**
 * Created by Adrien on 08/04/2015.
 */

/// <reference path="lib/jquery.d.ts"/>

class Parser {
    private hashLayerJson:{[path:string]: string; };
    private hashLayerPng:{[path:string]: string; };
    private hashRotorJson:{[path:string]: string; };

    private vectorsRecipes: {[path:string]: string; };
    private vectorsRotor: {[path:string]: string; };

    private METER: number;
    private width: number;
    private height: number;

    private glassScale: number = 1.9;

    constructor(width: number, height: number, METER: number){
        this.METER = METER;
        this.width = width;
        this.height = height;

        this.hashLayerJson["1"] = "static/physics/json/sprite_0000_Calque-2.json";
        this.hashLayerJson["2"] = "static/physics/json/sprite_0001_Calque-3.json";
        this.hashLayerJson["3"] = "static/physics/json/sprite_0002_Calque-4.json";
        this.hashLayerJson["4"] = "static/physics/json/sprite_0003_Calque-5.json";
        this.hashLayerJson["5"] = "static/physics/json/sprite_0004_Calque-6.json";
        this.hashLayerJson["6"] = "static/physics/json/sprite_0005_Calque-7.json";
        this.hashLayerJson["7"] = "static/physics/json/sprite_0006_Calque-8.json";
        this.hashLayerJson["8"] = "static/physics/json/sprite_0007_Calque-9.json";
        this.hashLayerJson["9"] = "static/physics/json/sprite_0008_Calque-1.json";
        this.hashLayerJson["10"] = "static/physics/json/sprite_0000_Calque-2.json";
        this.hashLayerJson["11"] = "static/physics/json/sprite_0001_Calque-3.json";
        this.hashLayerJson["12"] = "static/physics/json/sprite_0002_Calque-4.json";

        this.hashLayerPng["1"] = "static/physics/img/sprite-low_0000_Calque-2.png";
        this.hashLayerPng["2"] = "static/physics/img/sprite-low_0001_Calque-3.png";
        this.hashLayerPng["3"] = "static/physics/img/sprite-low_0002_Calque-4.png";
        this.hashLayerPng["4"] = "static/physics/img/sprite-low_0003_Calque-5.png";
        this.hashLayerPng["5"] = "static/physics/img/sprite-low_0004_Calque-6.png";
        this.hashLayerPng["6"] = "static/physics/img/sprite-low_0005_Calque-7.png";
        this.hashLayerPng["7"] = "static/physics/img/sprite-low_0006_Calque-8.png";
        this.hashLayerPng["8"] = "static/physics/img/sprite-low_0007_Calque-9.png";
        this.hashLayerPng["9"] = "static/physics/img/sprite-low_0008_Calque-1.png";
        this.hashLayerPng["10"] = "static/physics/img/sprite-low_0000_Calque-2.png";
        this.hashLayerPng["11"] = "static/physics/img/sprite-low_0001_Calque-3.png";
        this.hashLayerPng["12"] = "static/physics/img/sprite-low_0002_Calque-4.png";

        this.hashRotorJson["1"] = "static/physics/json/bottle.json";

        this.initRecipesVectors(this.hashLayerJson);
        this.initRotorVectors(this.hashRotorJson)

        console.log("Parser created");
    }

    private initRecipesVectors(hash)
    {
        for (var item in hash) {
            $.ajax({
                url: hash[item.toString()],
                async: false,
                dataType: "text",
                success: function (data) {
                    var f = JSON.parse(data);
                    var parse:any = f.rigidBodies[0].shapes[0].vertices;
                    var listPoint = [];

                    for (var i = 0; i < parse.length; i++) {
                        var vector = parse[i];
                        vector.x *= 1.9;
                        vector.x = (this.width / this.METER / 2) - this.glassScale / 2 + vector.x;

                        vector.y *= this.glassScale;
                        vector.y = this.height / this.METER - 1.5 - vector.y;

                        listPoint.push(vector);
                    }
                    this.vectorsRecipes[item] = listPoint;
                }
            });
        }
    }

    private initRotorVectors(hash) {
        for (var item in hash) {
            $.ajax({
                url: hash[item.toString()],
                async: false,
                dataType: "text",
                success: function (data) {
                    var f = JSON.parse(data);
                    var temp: any = f.rigidBodies[0].shapes[0].vertices;
                    var vectors = [];

                    var minX = 100;
                    var minY = 100;
                    var maxX = -100;
                    var maxY = -100;

                    for (var i = 0; i < temp.length; i++) {
                        var vector = temp[i];
                        vector.x *= 3;
                        vector.x = (this.width / this.METER / 5) - this.glassScale / 1.5 + vector.x;

                        vector.y *= 3;
                        vector.y = this.height / this.METER / 3 - vector.y;

                        if (vector.x < minX)
                            minX = vector.x;
                        if (vector.y < minY)
                            minY = vector.y;

                        if (vector.x > maxX)
                            maxX = vector.x;
                        if (vector.y > maxY)
                            maxY = vector.y;

                        vectors[i] = vector;
                    }

                   // rotorBodyWidth = maxX - minX;
                  //  rotorBodyHeight = maxY - minY;
                    this.vectorsRotor[item] = vectors;
                }
            });
        }
    }

    getRecipe(recipeId)
    {
       return this.vectorsRecipes[recipeId.toString()];
    }

    getRotor()
    {
        return  this.vectorsRotor["1"];
    }

    getRecipeImage(recipeId)
    {
        return this.hashLayerPng[recipeId.toString()];
    }

}