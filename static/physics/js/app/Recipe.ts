/**
 * Created by Francois on 03/05/15.
 */

class Recipe {
    PIXI:any;
    METER: number;
    width: number;
    height: number;

    constructor(width: number, height: number, meter: number, pixi:any) {
        this.PIXI = pixi;
        this.width = width;
        this.height = height;
        this.METER = meter;
    }

}

/*
function rotorRender(arr) {
    var graphics = new this.PIXI.Graphics();

    for (var i = 0; i <= arr.length; i++) {
        if (i == 0) {
            graphics.lineStyle(glassLineStrength, glassLineColor);
            graphics.beginFill(glassFillColor, glassAlphaColor);
        }
        else
            graphics.lineStyle(displayLineStrength, displayLineColor);
        var vectors = arr[i];
        if (vectors != null) {
            graphics.moveTo(arr[i][0].x * METER, arr[i][0].y * METER);
            for (var j = 1; j < vectors.length; j++) {
                graphics.lineTo(vectors[j].x * METER, vectors[j].y * METER);
            }
        }
        graphics.endFill();
    }
    stage.addChild(graphics);
}*/