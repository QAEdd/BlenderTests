var canvas = document.getElementById("renderCanvas");

        var startRenderLoop = function (engine, canvas) {
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        }

        var engine = null;
        var scene = null;
        var sceneToRender = null;
        var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createScene = function () {
    var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 0, 0);
	
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
	
    var hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.4;

	// Create fire material
	var fire = new BABYLON.FireMaterial("fire", scene);
	fire.diffuseTexture = new BABYLON.Texture("textures/fire.png", scene);
	fire.distortionTexture = new BABYLON.Texture("textures/distortion.png", scene);
	fire.opacityTexture = new BABYLON.Texture("textures/candleopacity.png", scene);
	fire.speed = 5.0;
	
	var light = new BABYLON.SpotLight("light", new BABYLON.Vector3(2, 2, 2), new BABYLON.Vector3(-1, -2, -1), 3, 1, scene);
	var generator = new BABYLON.ShadowGenerator(1024, light);
    generator.usePercentageCloserFiltering = true;
	generator.bias = 0.01;
    generator.transparencyShadow = true;

    //var particleSystem = new BABYLON.ParticleSystem("particles", 8000, scene);


	engine.displayLoadingUI();
	BABYLON.SceneLoader.ImportMesh("", "scenes/", "LearningAndSkillingRoomExperiv.3.1.glb", scene, function (meshes) {
		var plane = scene.getMeshByName("Plane");
		//plane.receiveShadows = true;
		
		// for (var i=0; i < meshes.length; i++) {
		// 	if (meshes[i] !== plane) {
		// 		generator.getShadowMap().renderList.push(meshes[i]);
		// 	}
        // }
		
		// plane = BABYLON.Mesh.CreatePlane("fireplane", 5, scene);
		// plane.position = new BABYLON.Vector3(0, 2.2, 0);
        // plane.scaling.x = 1;
        // plane.scaling.y = 0.7;
		// plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		// plane.material = fire;
        // plane.material.shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(plane.material);
		// generator.getShadowMap().renderList.push(plane);
		
		engine.hideLoadingUI();
        //particleSystem.start();
	});

        plane = BABYLON.Mesh.CreatePlane("fireplane", 5, scene);
        plane.position = new BABYLON.Vector3(-10, -1, 1);
        plane.scaling.x = 1;
        plane.scaling.y = 0.7;
        plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
        plane.material = fire;
        plane.material.shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(plane.material);
        generator.getShadowMap().renderList.push(plane);
        



return scene;

};
                window.initFunction = async function() {
                    
                    
                    var asyncEngineCreation = async function() {
                        try {
                        return createDefaultEngine();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                        }
                    }

                    window.engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        startRenderLoop(engine, canvas);
        window.scene = createScene();};
        initFunction().then(() => {sceneToRender = scene                    
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });