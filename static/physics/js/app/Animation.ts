/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/pixi.d.ts"/>
/// <reference path="Parser.ts"/>
/// <reference path="Shape.ts"/>
/// <reference path="Collision.ts"/>
/// <reference path="Graphics.ts"/>
/// <reference path="Recipe.ts"/>
/// <reference path="Particle.ts"/>
/// <reference path="Tools.ts"/>


/*
 document.addEventListener('mousedown', function (event) {
 var width = $("#cocktailRenderer").width();
 var height = $("#cocktailRenderer").height();
 var mouse = {x: (event.clientX - width) / METER , y:(event.clientY) / METER};
 var p = new b2Vec2(mouse.x, mouse.y);
 var aabb = new b2AABB();
 var d = new b2Vec2();

 d.Set(0.01, 0.01);
 b2Vec2.Sub(aabb.lowerBound, p, d);
 b2Vec2.Add(aabb.upperBound, p, d);

 var queryCallback = new QueryCallback(p)
 world.QueryAABB(queryCallback, aabb);

 if (queryCallback.fixture) {
 var body_query = queryCallback.fixture.body;
 var md = new b2MouseJointDef();
 md.bodyA = body;
 md.bodyB = body_query;
 md.target = p;
 md.maxForce = 1000;
 that.mouseJoint = world.CreateJoint(md);
 body_query.SetAwake(true);
 }
 });

 document.addEventListener('mousemove', function(event) {
 var width = $("#cocktailRenderer").width();
 var height = $("#cocktailRenderer").height();
 var mouse = {x: (event.clientX - width) / METER , y:(event.clientY) / METER};
 var p = new b2Vec2(mouse.x, mouse.y);
 if (that.mouseJoint) {
 that.mouseJoint.SetTarget(p);
 }
 });

 document.addEventListener('mouseup', function(event) {
 if (that.mouseJoint) {
 world.DestroyJoint(that.mouseJoint);
 that.mouseJoint = null;
 }
 });


 }

 function QueryCallback(point) {
 this.point = point;
 this.fixture = null;
 }

 QueryCallback.prototype.ReportFixture = function (fixture) {
 var body = fixture.body;
 if (body.GetType() == b2_dynamicBody) {
 var inside = fixture.TestPoint(this.point);
 if (inside) {
 this.fixture = fixture;
 return true;
 }
 }
 return false;
 };*/

class AnimationCocktail {
    width:number;
    height:number;

    private world:b2World;
    private parser:Parser;
    private shape:Shape;
    private collision:Collision;
    private graphics:Graphics;
    private recipe:Recipe;
    private particle:Particle;
    private tools:Tools;
    private events:Events;

    private time:number = 0;
    private METER:number = 100;

    constructor(managers:any) {
        this.world = new b2World(new b2Vec2(0, 10));

        this.parser = managers['parser'];
        this.shape = managers['shape'];
        this.collision = managers['collision'];
        this.graphics = managers['graphics'];
        this.recipe = managers['recipe'];
        this.events = managers['events'];
        this.tools = managers['tools'];
        this.particle = new Particle(this.graphics, this.events, this.tools);
    }

    private WorldReset() {
        this.events.resetTimeline();
        while (this.world.particleSystems.length > 0) {
            var system = this.world.particleSystems[0];
            this.world.DestroyParticleSystem(system);
        }
        while (this.world.bodies.length > 0) {
            var body = this.world.bodies[0];
            this.world.DestroyBody(body);
        }

        this.graphics.scene = new THREE.Scene();
        this.graphics.scene.add(this.graphics.camera);


        var psd = new b2ParticleSystemDef();
        psd.radius = 0.05;
        psd.dampingStrength = 0.4;
        psd.viscousStrength = 0.05;
        //psd.colorMixingStrength = 0.8;
        psd.colorMixingStrength = 0.01;
        this.world.CreateParticleSystem(psd);
        this.particle.Reset();
    }

    public Load(ingredients:any, recipe_id:number, reload:boolean) {
        this.WorldReset();
        var bdDef:b2BodyDef = new b2BodyDef();
        var body:b2Body = this.world.CreateBody(bdDef);

        var rotorDef:b2BodyDef = new b2BodyDef();
        var rotorBody:b2Body = this.world.CreateBody(rotorDef);

        var recipe:number = ((recipe_id == 0) ? Math.floor(Math.random() * 12) + 1 : recipe_id);
        var rotorArr:any = [];
        var recipeArr:any = [];
        rotorArr.push(this.parser.getRotor());
        recipeArr.push(this.parser.getRecipe(recipe));

        this.collision.LinkShape(body, recipeArr, this.world);

        this.collision.LinkRotor(rotorBody, this.world);

        this.graphics.RenderRecipe(this.parser.getRecipeImagePath(recipe_id));

        var distributions = this.recipe.generateDistribution(ingredients);
        for (var i = 0; i < distributions.length; i++) {
            var distribution = distributions[i];
            this.particle.addFlowBottle(distribution.pop, distribution.color, distribution.opacity, distribution.quantity, this.world);
        }
        if (!reload)
            requestAnimationFrame(this.animate.bind(this));
    }

    private step() {
        var timeStep:number = 1.0 / 60.0;
        var velocityIterations:number = 3;
        var positionIterations:number = 3;
        this.world.Step(timeStep, velocityIterations, positionIterations);
        this.time += 1 / 60;
    }

    public animate() {
        this.step();
        var system = this.world.particleSystems[0];

        var particles = system.GetPositionBuffer();
        var color = system.GetColorBuffer();

        var dropable_index = [];
        for (var key in this.particle.circleIndex) {
            var index = this.particle.circleIndex[key];
            var circle = this.particle.circleArr[index];
            if (circle.position.y < 10) {
                circle.position.x = particles[index * 2];
                circle.position.y = particles[(index * 2) + 1];
                circle.material.setValues({color: parseInt(this.tools.rgbToHex(color[index * 4], color[(index * 4) + 1], color[(index * 4) + 2]), 16)});
            }
            else {
                dropable_index.push(this.particle.circleIndex[key]);
            }
        }

        if (dropable_index.length > 0) {
            for (var key in dropable_index) {
                var index = this.particle.circleIndex.indexOf(dropable_index[key]);
                if (index > -1) {
                    this.particle.circleIndex.splice(index, 1);
                }
            }
        }
        this.graphics.threeRenderer.render(this.graphics.scene, this.graphics.camera);
        requestAnimationFrame(this.animate.bind(this));
    }
}