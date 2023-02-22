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

const box = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 0.75, depth: 0.25});

box.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager = new BABYLON.ActionManager(scene);

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

scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnKeyUpTrigger,
            parameter: 'r'
        },
        function () { stop() }
    )
);

// box.actionManager.registerAction(
//     new BABYLON.InterpolateValueAction(
//         BABYLON.ActionManager.OnPickTrigger, 
//         stop()
//     )
// )

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

