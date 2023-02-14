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