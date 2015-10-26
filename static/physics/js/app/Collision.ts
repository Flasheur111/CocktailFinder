/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>

/**
 * This function takes the body created by the current Animation
 * The second argument is an array of array of vectors
 *
 * [array] ->
 *          [0] (array vectors) Link each vectors between them
 *          [1] (array vectors) Link each vectors between them
 *          [2] (array vectors) Link each vectors between them
 *
 * @param body
 * @param shapeArr
 * @return void
 */

declare var world:any;
class Collision {
    public LinkShape(body:b2Body, shapeArr:any, world_cpy:b2World) {
        world = world_cpy;
        for (var i = 0; i < shapeArr.length; i++) {
            var vectors:any = shapeArr[i];
            if (vectors != null && vectors.length > 0) {
                var vectorStart = vectors[0];
                for (var j = 1; j < vectors.length; j++) {
                    var shape = new b2EdgeShape();
                    shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[j].x, vectors[j].y));
                    body.CreateFixtureFromShape(shape, 20);
                    vectorStart = vectors[j];
                }
                // PART TO LINK LAST AND FIRST VERTEX
                shape = new b2EdgeShape();
                shape.Set(new b2Vec2(vectorStart.x, vectorStart.y), new b2Vec2(vectors[0].x, vectors[0].y));
                body.CreateFixtureFromShape(shape, 20);
                vectors[vectors.length] = shape.vertex2;
            }
        }
    }

    LinkRotor(body:b2Body, world_cpy:b2World, width:number, height:number, METER: number) {
        world = world_cpy;
        var xPoint = (width / METER / 4) - 0.3;
        var yPoint = height / METER / 4 + 0.4;
        var spawnPoint = new b2Vec2(xPoint, yPoint);

        var box = new b2PolygonShape();
        box.SetAsBoxXYCenterAngle(0.7, 0.5, spawnPoint, 0.7);
        body.CreateFixtureFromShape(box,20);
    }
}
