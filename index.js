const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    var location1 = new BABYLON.Vector3(-5, 0, -2);
    const fpc = new BABYLON.UniversalCamera("fps", location1, scene);
    fpc.attachControl(true);
    fpc.ellipsoid = new BABYLON.Vector3(0.2, 0.65, 0.2);
    fpc.speed = 0.15;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const ground = new BABYLON.MeshBuilder.CreateGround("ground", {width:300, height:200}, scene);
    ground.position = new BABYLON.Vector3(0, -2, 0);

    scene.collisionsEnbaled = true;

    BABYLON.SceneLoader.ImportMesh("", "Models/", "newModel.glb", scene, function(meshes) {
        for (let i in meshes){
            const regexChairr = /(Chairrr.0[0-9][0-9]_primitive2)/;
            const regexTable = /(Desk.0[0-9][0-9]_primitive0)/;
            const regexDivider = /(LargeSeperator2.0[0-9][0-9]_primitive0)/;
            const regexCupboard = /(bigCupboard.0[0-9][0-9]_primitive1)/;
            if (regexChairr.test(meshes[i]) || regexTable.test(meshes[i].name) || regexCupboard.test(meshes[i].name) || regexDivider.test(meshes[i].name)){
                meshes[i].checkCollisions = true;
            }
            else if (meshes[i].name == "Walls" || meshes[i].name == "Pillar1" || meshes[i].name =="Pillarr2"){
                meshes[i].checkCollisions = true;
            }
        }
    });

    fpc.checkCollisions = true;
    ground.checkCollisions = true;

    const assumedFramesPerSecond = 45;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity/assumedFramesPerSecond, 0);
    //fpc.applyGravity = true;

    var fire = new BABYLON.FireMaterial("fire", scene);
	fire.diffuseTexture = new BABYLON.Texture("textures/fire.png", scene);
	fire.distortionTexture = new BABYLON.Texture("textures/distortion.png", scene);
	fire.opacityTexture = new BABYLON.Texture("textures/candleopacity.png", scene);
	fire.speed = 5.0;

    plane = BABYLON.Mesh.CreatePlane("fireplane", 5, scene);
    plane.position = new BABYLON.Vector3(-10, -1, 1);
    plane.scaling.x = 1;
    plane.scaling.y = 0.7;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
    plane.material = fire;
    plane.material.shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(plane.material);
    //generator.getShadowMap().renderList.push(plane);

    // scene.debugLayer.show();

    // const sound = new BABYLON.Sound("winterSounds", "Sounds/fire-2.mp3", scene, function(){
    //     sound.play(52);
    // }, {loop:true, autoplay: true});

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 800, scene);
    
    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png", scene);

    // lifetime
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 4;

    // emit rate
    particleSystem.emitRate = 50;

    // gravity
    particleSystem.gravity = new BABYLON.Vector3(0.25, 1.5, 0);

    // size gradient
    particleSystem.addSizeGradient(10, 10, 10);
    particleSystem.addSizeGradient(0.3, 1, 2);
    particleSystem.addSizeGradient(0.5, 2, 3);
    particleSystem.addSizeGradient(1.0, 6, 8);

    // color gradient
    particleSystem.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0),  new BABYLON.Color4(0.8, 0.8, 0.8, 0));
    particleSystem.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
    particleSystem.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
    particleSystem.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));

    // speed gradient
    particleSystem.addVelocityGradient(0, 1, 1.5);
    particleSystem.addVelocityGradient(0.1, 0.8, 0.9);
    particleSystem.addVelocityGradient(0.7, 0.4, 0.5);
    particleSystem.addVelocityGradient(1, 0.1, 0.2);

    // rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -1;
    particleSystem.maxAngularSpeed = 1;

    // blendmode
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    
    // emitter shape
    var sphereEmitter = particleSystem.createSphereEmitter(0.1);

    // Where the particles come from
    particleSystem.emitter = new BABYLON.Vector3(-6, -1, -5); // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-10, -0.5, -5); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(10, 0.5, 0.5); // To...

    var particleSystem2 = particleSystem;

    particleSystem.emitter = new BABYLON.Vector3(-10, -1, 1); // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-10, -0.5, -5); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5); // To...

    // Start the particle system
    particleSystem.start();
    //particleSystem2.start();

    // Create a particle system
    var particleSystem2 = new BABYLON.ParticleSystem("particles", 8000, scene);

    //Texture of each particle
    particleSystem2.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png", scene);

    // lifetime
    particleSystem2.minLifeTime = 1;
    particleSystem2.maxLifeTime = 2;

    // emit rate
    particleSystem2.emitRate = 1000;

    // gravity
    particleSystem2.gravity = new BABYLON.Vector3(0.25, 1.5, 0);

    // size gradient
    particleSystem2.addSizeGradient(0, 0.6, 1);
    particleSystem2.addSizeGradient(0.3, 1, 2);
    particleSystem2.addSizeGradient(0.5, 2, 3);
    particleSystem2.addSizeGradient(1.0, 6, 8);

    // color gradient
    particleSystem2.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0),  new BABYLON.Color4(0.8, 0.8, 0.8, 0));
    particleSystem2.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
    particleSystem2.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
    particleSystem2.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));

    // speed gradient
    particleSystem2.minEmitPower = .01;
    particleSystem2.maxEmitPower = .1;


    // rotation
    particleSystem2.minInitialRotation = 0;
    particleSystem2.maxInitialRotation = 1 //Math.PI;
    particleSystem2.minAngularSpeed = -1;
    particleSystem2.maxAngularSpeed = 1;

    // blendmode
    particleSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    
    // emitter shape
    var boxEmitter = particleSystem2.createBoxEmitter(new BABYLON.Vector3(16, -2, -16),
    new BABYLON.Vector3(7, 8, -3),
    new BABYLON.Vector3(-1, 0, 0),
    new BABYLON.Vector3(1, 0, 0));

    boxEmitter.direction1 = new BABYLON.Vector3(0, 0, 0); 
    //boxEmitter.direction2 = new BABYLON.Vector3(5, 2, 1);
    boxEmitter.minEmitBox = new BABYLON.Vector3(-15, -2, -7);  
    boxEmitter.maxEmitBox = new BABYLON.Vector3(14, -2, 11);


    // Start the particle system
    particleSystem2.start();
    

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        
var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Start");
button1.width = "150px"
button1.height = "40px";
button1.color = "white";
button1.cornerRadius = 20;
button1.background = "green";
let x = new BABYLON.GUI.TextBlock('TextBlock', '0'); 
var count = 0;
var countFinal = 0;
var timer = null;
var cont = true;
button1.onPointerUpObservable.add(function() {
   
    start();
});
advancedTexture.addControl(button1);   

const box = BABYLON.MeshBuilder.CreateBox("box", {height: 3, width: 0.75, depth: 0.25});
box.position = new BABYLON.Vector3(2.5, -2, 9.5);
const myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
box.material = myMaterial;
box.actionManager = new BABYLON.ActionManager(scene);

// box.actionManager.registerAction(
//     new BABYLON.InterpolateValueAction(
//         BABYLON.ActionManager.OnPickTrigger, 
//         stop()
//     )
// )

BABYLON.box.actionManager.registerAction(
    new BABYLON.InterpolateValueAction(
        BABYLON.ActionManager.OnPickTrigger,
        stop()
    )
);

function start() {
    
    var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 0.05;
    rect1.horizontalAlignment = 0;
    rect1.verticalAlignment = 0;
    rect1.height = "40px";
    rect1.cornerRadius = 10;
    rect1.color = "black";
    rect1.thickness = 4;
    rect1.background = "white";
    advancedTexture2.addControl(rect1);
    rect1.addControl(x);
    button1.isEnable = false;
    button1.isVisible = false;
    timer = setInterval(start2, 1000)
    console.log("im crying")
    // timer = setInterval(() => {
    //     count++;
    //     x.text = String(count);
    //     }, 1000);
}




function stop() {
    console.log("in stop")
    clearInterval(timer)
    //cont = false;
    
}

function start2() {
    console.log("in start1")
    if (cont == true) {
        console.log("in start 2")
        count++;
        x.text = String(count);
    }

}


    return scene;
};

const sceneToRender = createScene();
engine.runRenderLoop(function () {
    sceneToRender.render();
})
