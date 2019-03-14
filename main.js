let canvas;
let device;
let mesh;
let meshes = [];
let camera;
let engine;
let lightPos;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    $('#wireframe').on('click', () => {
        engine.wireframe = 1;
        engine.rastered  = 0;
        engine.shaded    = 0;
        engine.textured  = 0;
    });
    
    $('#rastered').on('click', () => {
        engine.wireframe = 0;
        engine.rastered  = 1;
        engine.shaded    = 0;
        engine.textured  = 0;
    });

    $('#shaded').on('click', () => {
        engine.wireframe = 0;
        engine.rastered  = 0;
        engine.shaded    = 1;
        engine.textured  = 0;
    });

    $('#textured').on('click', () => {
        engine.wireframe = 0;
        engine.rastered  = 0;
        engine.shaded    = 0;
        engine.textured  = 1;
    });
    
    canvas = document.getElementById("frontBuffer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    engine = new SoftEngine();

    camera = new SoftEngine.Camera();
    camera.Position = new BABYLON.Vector3(0, 3, -12);
    camera.Target = new BABYLON.Vector3(0, 0, 0);
    lightPos = new BABYLON.Vector3(0, 5, -5);

    device = new SoftEngine.Device(canvas);
    device.LoadJSONFile("monkey.babylon", loadJSONCompleted);
}

function loadJSONCompleted(meshesLoaded) {
    meshes = meshesLoaded;
    requestAnimationFrame(drawingLoop);
}

function drawingLoop() {
    device.clear();
    for (let i = 0; i < meshes.length; i++) {
        // rotating slightly the mesh during each frame rendered
        // meshes[i].Rotation.x += 0.01;
        meshes[i].Rotation.y += 0.02;
    }
    device.render(camera, meshes, engine, lightPos);
    device.present();
    window.requestAnimationFrame(drawingLoop);
}
