/**
 * Created by Adrien on 14/04/2015.
 */

function createIceCube(offsetX, offsetY, size) {
    var bd = new b2BodyDef();
    var shape = new b2PolygonShape();
    bd.type = b2_dynamicBody;
    var tempWindowWidth = $("#cocktailRenderer").width() / METER;
    var tempWindowHeight = $("#cocktailRenderer").height() / METER;
    tempWindowWidth /= 2;
    tempWindowHeight /= 2;
    var vertices = shape.vertices;
    var ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);
    var body = world.CreateBody(bd);
    //shape.radius = 0.5;
    body.CreateFixtureFromShape(shape, 0.9);
    objectPhysicsArr[objectArrInc] = body;
    var image = new Image();
    image.src = "icecube2.png";
    var base = new PIXI.BaseTexture(image);
    var texture = new PIXI.Texture(base);
    var iceCube = new PIXI.Sprite(texture);
    iceCube.anchor.x = 0.5;
    iceCube.anchor.y = 0.5;
    iceCube.width = size * METER + 5;
    iceCube.height = size * METER + 5;
    objectDisplayArr[objectArrInc++] = iceCube;
    stage.addChild(iceCube);
}

function createPaille(offsetX, offsetY, size) {
    var bd = new b2BodyDef();
    var shape = new b2PolygonShape();
    bd.type = b2_dynamicBody;
    var tempWindowWidth = $("#cocktailRenderer").width() / METER;
    var tempWindowHeight = $("#cocktailRenderer").height() / METER;
    tempWindowWidth /= 2;
    tempWindowHeight /= 2;
    var vertices = shape.vertices;
    var ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);
    var body = world.CreateBody(bd);
    //shape.radius = 0.5;
    body.CreateFixtureFromShape(shape, 0.9);
    objectPhysicsArr[objectArrInc] = body;
    var image = new Image();
    image.src = "straw.png";
    var base = new PIXI.BaseTexture(image);
    var texture = new PIXI.Texture(base);
    var iceCube = new PIXI.Sprite(texture);
    iceCube.anchor.x = 0.5;
    iceCube.anchor.y = 0.5;
    iceCube.width = size * METER + 5;
    iceCube.height = size * METER + 5;
    objectDisplayArr[objectArrInc++] = iceCube;
    stage.addChild(iceCube);
}

function createCitron(offsetX, offsetY, size) {
    var bd = new b2BodyDef();
    var shape = new b2PolygonShape();
    bd.type = b2_dynamicBody;
    var tempWindowWidth = $("#cocktailRenderer").width() / METER;
    var tempWindowHeight = $("#cocktailRenderer").height() / METER;
    tempWindowWidth /= 2;
    tempWindowHeight /= 2;
    var vertices = shape.vertices;
    var ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + size + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);
    ve = new b2Vec2(offsetX + tempWindowWidth, offsetY + size + tempWindowHeight);
    vertices.push(ve);
    var body = world.CreateBody(bd);
    //shape.radius = 0.5;
    body.CreateFixtureFromShape(shape, 0.9);
    objectPhysicsArr[objectArrInc] = body;
    var image = new Image();
    image.src = "citron.png";
    var base = new PIXI.BaseTexture(image);
    var texture = new PIXI.Texture(base);
    var iceCube = new PIXI.Sprite(texture);
    iceCube.anchor.x = 0.5;
    iceCube.anchor.y = 0.5;
    iceCube.width = size * METER + 8;
    iceCube.height = size * METER + 8;
    objectDisplayArr[objectArrInc++] = iceCube;
    stage.addChild(iceCube);
}

/*

 +  bd = new b2BodyDef();
 +  var circle = new b2CircleShape();
 +  bd.type = b2_dynamicBody;
 +  var body = world.CreateBody(bd);
 +  circle.position.Set(0, 4);
 +  circle.radius = 0.2;
 +  body.CreateFixtureFromShape(circle, 0.5);


 */