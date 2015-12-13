/**
 * Created by Francois on 07/10/15.
 */
/*
 * Definitions author Ivane Gegia http://ivane.info
 */

declare class b2Vec2
{
    constructor(x:number,y:number);
    Set(newX:number, newY:number);
    Clone();

    x:number
    y:number
}

declare class b2Color
{
    constructor(r:number, g:number, b:number);
    Set(ri: number, gi: number, bi: number);

    r:number;
    g:number;
    b:number;
}

declare class b2Filter
{
    categoryBits:number
    maskBits:number
    groupIndex:number
}

declare class b2BodyDef
{
    type:any
    position:b2Vec2
    linearDamping:number
    angularDamping:number
    fixedRotation:boolean
    bullet:boolean
    active:boolean
    userData:number
    filter:b2Filter
}

declare class b2Fixture
{
    SetDensity(density:number);
    filter:b2Filter
    shape:any

    GetFriction():number;
    SetFriction(friction:number):void;

    GetRestitution():number;
    SetRestitution(restitution:number):void;

    GetShape():b2Shape;

    TestPoint(worldPoint:b2Vec2):boolean;

    userData: number;
    body:b2Body;
    GetUserData(): number;
}

declare class b2MassData
{

}

declare class b2Body
{

    fixtures:b2Fixture[]
    position:b2Vec2

    CreateFixtureFromShape(shape:b2Shape, density:number):b2Fixture;
    CreateFixtureFromDef(fixtureDefinition:b2FixtureDef):b2Fixture;

    GetPosition():b2Vec2;
    GetAngle():number;
    GetMass():number;
    GetInertia():number;
    GetLocalCenter():b2Vec2;
    GetTransform():b2Transform;

    SetType(type:any);
    GetType():any;

    SetBullet(flag:boolean);
    IsBullet():boolean;

    SetSleepingAllowed(flag:boolean);
    IsSleepingAllowed():boolean;

    SetAwake(flag:boolean);
    IsAwake():boolean;

    SetActive(flag:boolean);
    IsActive():boolean;

    SetFixedRotation(flag:boolean);
    IsFixedRotation():boolean;

    GetWorldCenter():b2Vec2;
    GetLocalCenter():b2Vec2;
    ResetMassData();

    DestroyFixture(fixture:b2Fixture):void;

    SetLinearVelocity(lVelocity:b2Vec2):void;
    GetLinearVelocity():b2Vec2;

    SetAngularVelocity(omega:number):void;
    GetAngularVelocity():number;

    ApplyForce(force:b2Vec2, point:b2Vec2, wake:boolean):void;
    ApplyForceToCenter(force:b2Vec2,wake:boolean):void;

    ApplyTorque(torque:number, wake:boolean):void;

    ApplyLinearImpulse(impulse:b2Vec2, point:b2Vec2, wake:boolean):void;
    ApplyAngularImpulse(impulse:number, wake:boolean):void;

    GetMass():number;
    GetInertia():number;

    GetWorldPoint(localPoint:b2Vec2):b2Vec2;
    GetLocalPoint(worldPoint:b2Vec2):b2Vec2;

    SetGravityScale(gScale:number):void;

    SetSleepingAllowed(flag:boolean):void;
    IsSleepingAllowed():boolean;

    SetAwake(flag:boolean):void;
    IsAwake():boolean;

    SetActive(flag:boolean):void;
    IsActive():boolean;

    GetPositionX():number;
    GetPositionY():number;
    SetTransform(position:b2Vec2,angle:number):void;

    SetLinearVelocity(v:b2Vec2):void;
    GetLinearVelocity():b2Vec2;

    SetAngularVelocity(omega:number):void;
    GetAngularVelocity():number;

    GetUserData():number;
    userData: number;
}

interface b2QueryCallback
{
    ReportFixture(fixture:b2Fixture):boolean;
}

declare class b2AABB
{
    lowerBound:b2Vec2
    upperBound:b2Vec2
}

interface b2RayCastCallback
{

}

declare class b2World
{
    constructor(gravity:b2Vec2);

    CreateBody(bodyDefinition:b2BodyDef):b2Body;
    DestroyBody(bodyDefinition:b2Body):void;

    CreateJoint(jointDefinition:b2JointDef):b2Joint;

    Step(timeStep:number, velocityIterations:number, positionIterations:number);

    SetContactListener(listener:b2ContactListener):void;

    QueryAABB(callback:b2QueryCallback, aabb:b2AABB):void;
    RayCast(callback:b2RayCastCallback, point1:b2Vec2, point2:b2Vec2):void;

    CreateParticleSystem(particleSystemDef:b2ParticleSystemDef):b2ParticleSystem;
    DestroyParticleSystem(particleSystem:b2ParticleSystem):void;

    bodies:b2Body[]
    particleSystems:b2ParticleSystem[]
}

declare module 'b2World' {
    export = b2World
}

declare interface b2ContactListener
{
    BeginContactBody(contact:b2Contact):void;
    //BeginContactBody(particleSystem: b2ParticleSystem, particleContact: b2ParticleContact):void;
    EndContactBody(contact:b2Contact):void;
    PreSolve(contact:b2Contact, manifold:b2Manifold):void;
    PostSolve(contact:b2Contact, manifold:b2Manifold):void;
}

declare interface b2ContactFilter {
    ShouldCollide(particleSystem:b2ParticleSystem, particleIndexA:number, particleIndexB:number);
}

declare class b2ParticleBodyContact
{
    index: number;
    body: b2Body;
    fixture: b2Fixture;
    weight: number;
    normal: b2Vec2;
    mass:number;
}

declare class b2Shape
{
    radius:number
    position:b2Vec2

    GetPositionX():number;
    GetPositionY():number;
    SetPosition(x:number, y:number);
    SetAsArray(array:b2Vec2[]);
}

declare class b2EdgeShape extends b2Shape
{
    vertex1:b2Vec2
    vertex2:b2Vec2
    Set(v1:b2Vec2, v2:b2Vec2);
}

declare class b2ChainShape extends b2Shape
{
    CreateChain(points:Array<b2Vec2>);
}

declare class b2CircleShape extends  b2Shape
{

}

declare class b2Rot {
    s:number;
    c:number;

    constructor(angle:number);
    Set(angle:number):void;
    SetIdentity():void;
    GetAngle():number;
    GetXAxis():b2Vec2;
    GetYAxis():b2Vec2;
}

declare class b2Transform
{
    p:b2Vec2;
    q:b2Rot;

    constructor();
    constructor(position:b2Vec2, rotation:b2Vec2);
    SetIdentity():void;
    Set(position:b2Vec2, angle:number);
}

declare class b2PolygonShape extends b2Shape
{
    SetAsBoxXY(halfWidth:number,halfHeight:number);
    SetAsBoxXYCenterAngle(halfWidth:number, halfHeight:number, center:b2Vec2, angle:number);
    SetAsArray(array:b2Vec2[]);
    vertices:[b2Vec2];
}

declare var b2_dynamicBody:any
declare var b2_kinematicBody:any
declare var b2_staticBody:any

declare class b2FixtureDef
{
    shape:any
    density:number
    friction:number
    restitution:number
    filter:b2Filter
}

//Joint definitions
declare class b2JointDef
{
    collideConnected:boolean
    frequencyHz:number
    dampingRatio:number

    bodyA:b2Body
    bodyB:b2Body
}

declare class b2DistanceJointDef extends b2JointDef
{
    localAnchorA:b2Vec2
    localAnchorB:b2Vec2
    length:number

    InitializeAndCreate(bodyA:b2Body, bodyB:b2Body, anchorA:b2Vec2, anchorB:b2Vec2);
}

declare class b2RevoluteJointDef extends b2JointDef
{
    lowerAngle:number
    upperAngle:number
    enableLimit:boolean
    motorSpeed:number
    enableMotor:number

    localAnchorA:b2Vec2
    localAnchorB:b2Vec2

    InitializeAndCreate(bodyA:b2Body, bodyB:b2Body, sharedAnchorInWorldSpace:b2Vec2);
}

declare class b2PrismaticJointDef extends b2JointDef
{
    lowerTranslation:number
    upperTranslation:number
    enableLimit:boolean
    maxMotorForce:number
    motorSpeed:number
    enableMotor:boolean
}

declare class b2PulleyJointDef extends  b2JointDef
{

}

declare class b2GearJointDef extends  b2JointDef
{

}

//Joint classes
declare class b2Joint
{

}

declare class b2DistanceJoint extends b2Joint
{

}

declare class b2RevoluteJoint extends b2Joint
{
    GetJointAngle():number;
    GetJointSpeed():number;
    GetMotorTorque():number;

    SetMotorSpeed(speed:number);
    SetMaxMotorTorque(torque:number);
}

declare class b2PrismaticJoint extends b2Joint
{
    GetJointTranslation():number;
    GetJointSpeed():number;
    GetMotorForce():number;

    SetMotorSpeed(speed:number);
    SetMotorForce(force:number);
}

declare class b2PulleyJoint extends  b2Joint
{
    GetLengthA():number;
    GetLengthB():number;
}

declare class b2Contact
{
    GetManifold():b2Manifold;
    GetFixtureA():b2Fixture;
    GetFixtureB():b2Fixture;
    SetEnabled(enabled:boolean):void;
}

declare class b2Manifold
{
    points:[b2ManifoldPoint];
}

declare class b2ManifoldPoint
{
    localPoint:b2Vec2;
    normalImpulse:number;
    tangentImpulse:number;
    id:b2ContactID;
}

declare class b2ContactID
{
    cf:b2ContactFeature;
    key:number;
}

declare class b2ContactFeature
{
    indexA:number;
    indexB:number;
    typeA:number;
    typeB:number;
}



//Particles
declare class b2ParticleColor
{
    constructor(r:number, g:number, b:number, a:number);
    constructor(color: b2Color);

    Set(r: number, g: number, b: number, a : number);
    Set(color:b2Color);
}

declare class b2ParticleDef
{
    flags:any
    position:b2Vec2
    color:b2ParticleColor
}

declare class b2ParticleSystemDef
{
    strictContactCheck:boolean;
    density:number;
    gravityScale:number;
    radius:number;
    maxCount:number;
    pressureStrenght:number;
    dampingStrength:number;
    elasticStrength:number;
    springStrength:number;
    viscousStrength:number;
    surfaceTensionPressureStrength:number;
    surfaceTensionNormalStrength:number;
    repulsiveStrength:number;
    powderStrength:number;
    ejectionStrength:number;
    staticPressureStrength:number;
    staticPressureRelaxation:number;
    staticPressureIterations:number;
    colorMixingStrength:number;
    destroyByAge:boolean;
    lifetimeGranularity:number;
}

declare class b2ParticleGroupDef
{
    flags:any
    position:b2Vec2
    color:b2ParticleColor
    angle:number
    angularVelocity:number
    shape:b2Shape
    strength:number;
}

declare class b2ParticleGroup
{
    SetGroupFlags(flags:any);
    GetGroupFlags():any;
    DestroyParticles(callDestructionListener:boolean):void;
}

declare class b2ParticleSystem
{
    CreateParticle(particleDefinition:b2ParticleDef):number;
    DestroyParticlesInShape(shape:b2Shape, transform:b2Transform):void;

    CreateParticleGroup(particleGroupDefinition:b2ParticleGroupDef);

    SetPaused(paused:boolean):void;

    SetParticleDestructionByAge(deletionByAge:boolean):void;
    SetParticleLifetime(particleIndex:number, lifetime:number):void;
    SetDensity(density:number):void;
    GetStuckCandidateCount():number;
    GetStuckCandidates():Array<number>;
    GetPositionBuffer():Float32Array;
    GetColorBuffer():Uint8Array;

    SetRadius(radious:number):void;
}

declare class b2ParticleContact
{

}

declare var b2_waterParticle:any;
declare var b2_zombieParticle:any;
declare var b2_wallParticle:any;
declare var b2_springParticle:any;
declare var b2_elasticParticle:any;
declare var b2_viscousParticle:any;
declare var b2_powderParticle:any;
declare var b2_tensileParticle:any;
declare var b2_colorMixingParticle:any;
declare var b2_destructionListenerParticle:any;
declare var b2_barrierParticle:any;
declare var b2_staticPressureParticle:any;
declare var b2_reactiveParticle:any;
declare var b2_repulsiveParticle:any;
declare var b2_fixtureContactListenerParticle:any;
declare var b2_particleContactListenerParticle:any;
declare var b2_fixtureContactFilterParticle:any;
declare var b2_particleContactFilterParticle:any;




