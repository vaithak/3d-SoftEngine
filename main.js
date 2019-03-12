var canvas;
var device;
var mesh;
var meshes = [];
var camera;
var engine;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    $('#wireframe').on('click', () => {
        console.log("hi")
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

    // $('#shaded').on('click', () => {
    //     engine.wireframe = 0;
    //     engine.rastered  = 0;
    //     engine.shaded    = 1;
    //     engine.textured  = 0;
    // });

    // $('#textured').on('click', () => {
    //     engine.wireframe = 0;
    //     engine.rastered  = 0;
    //     engine.shaded    = 0;
    //     engine.textured  = 1;
    // });
    
    canvas = document.getElementById("frontBuffer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    engine = new SoftEngine();

    camera = new SoftEngine.Camera();
    camera.Position = new BABYLON.Vector3(0, 2, -10);
    camera.Target = new BABYLON.Vector3(0, 0, 0);

    // // Drawing a cube
    // mesh = new SoftEngine.Mesh("Cube", 8);
    // mesh.Vertices[0] = new BABYLON.Vector3(-1, 1, 1);
    // mesh.Vertices[1] = new BABYLON.Vector3(1, 1, 1);
    // mesh.Vertices[2] = new BABYLON.Vector3(-1, -1, 1);
    // mesh.Vertices[3] = new BABYLON.Vector3(1, -1, 1);
    // mesh.Vertices[4] = new BABYLON.Vector3(-1, 1, -1);
    // mesh.Vertices[5] = new BABYLON.Vector3(1, 1, -1);
    // mesh.Vertices[6] = new BABYLON.Vector3(1, -1, -1);
    // mesh.Vertices[7] = new BABYLON.Vector3(-1, -1, -1);

    // mesh.Faces[0] = { A:0, B:1, C:2 };
    // mesh.Faces[1] = { A:1, B:2, C:3 };
    // mesh.Faces[2] = { A:1, B:3, C:6 };
    // mesh.Faces[3] = { A:1, B:5, C:6 };
    // mesh.Faces[4] = { A:0, B:1, C:4 };
    // mesh.Faces[5] = { A:1, B:4, C:5 };
    // mesh.Faces[6] = { A:2, B:3, C:7 };
    // mesh.Faces[7] = { A:3, B:6, C:7 };
    // mesh.Faces[8] = { A:0, B:2, C:7 };
    // mesh.Faces[9] = { A:0, B:4, C:7 };
    // mesh.Faces[10] = { A:4, B:5, C:6 };
    // mesh.Faces[11] = { A:4, B:6, C:7 };
    // meshes.push(mesh);

    device = new SoftEngine.Device(canvas);
    device.LoadJSONFile("monkey.babylon", loadJSONCompleted);
}

function loadJSONCompleted(meshesLoaded) {
    meshes = meshesLoaded;
    requestAnimationFrame(drawingLoop);
}

function drawingLoop() {
    device.clear();
    for (var i = 0; i < meshes.length; i++) {
        // rotating slightly the mesh during each frame rendered
        // meshes[i].Rotation.x += 0.01;
        meshes[i].Rotation.y += 0.01;
    }
    device.render(camera, meshes, engine);
    device.present();
    window.requestAnimationFrame(drawingLoop);
}
