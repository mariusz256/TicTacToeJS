var scene;
var renderer;
var camera;
var axes;
var plane;
var stats;

var controls = new (function () {
  this.CameraPositionX = 2;
  this.CameraPositionY = 10;
  this.CameraPositionZ = 30;
  this.SpotlightPositionX = -100;
  this.SpotlightPositionY = 100;
  this.SpotlightPositionZ = 200;
})();

function initStats() {
  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";

  document.getElementById("Stats-output").appendChild(stats.domElement);

  return stats;
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initPlane(data) {
  plane = new THREE.Mesh(data.planeGeometry, data.planeMaterial);
  plane.rotation.x = data.xRotation;
  plane.position.x = data.x;
  plane.position.y = data.y;
  plane.position.z = data.z;
  return plane;
}

function initCamera(data) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = data.x;
  camera.position.y = data.y;
  camera.position.z = data.z;
  camera.lookAt(scene.position);
  camera.lookAt(new THREE.Vector3(-4, 3, 5));
}

function init() {
  //console
  var stats = initStats();
  var gui = new dat.GUI();
  var cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(controls, "CameraPositionX", -100, 100);
  cameraFolder.add(controls, "CameraPositionY", -100, 100);
  cameraFolder.add(controls, "CameraPositionZ", -100, 100);
  var spotLightFolder = gui.addFolder("Spotlight");
  spotLightFolder.add(controls, "SpotlightPositionX", -1000, 1000);
  spotLightFolder.add(controls, "SpotlightPositionY", -1000, 1000);
  spotLightFolder.add(controls, "SpotlightPositionZ", -1000, 1000);

  scene = new THREE.Scene();
  initRenderer();
  initPlane({
    planeGeometry: new THREE.PlaneGeometry(60, 20, 1, 1),
    planeMaterial: new THREE.MeshBasicMaterial({
      color: 0xcccccc,
    }),
    xRotation: -0.5 * Math.PI,
    x: 15,
    y: 0,
    z: 0,
  });

  //initCamera({ x: -30, y: 40, z: 30 });
  initCamera({
    x: 2,
    y: 10,
    z: 30,
  });
  scene.add(camera);
  //scene.add(plane);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-100, 100, 200);
  scene.add(spotLight);

  var ambiColor = "#0c0c0c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: false,
  });
  side1 = new THREE.Object3D();
  addCube({
    name: "side1topleft",
    x: -8.5,
    y: 7.5,
    z: 5,
  });
  addCube({
    name: "side1topmiddle",
    x: -4,
    y: 7.5,
    z: 5,
  });
  addCube({
    name: "side1topright",
    x: 0.5,
    y: 7.5,
    z: 5,
  });
  addCube({
    name: "side1middleleft",
    x: -8.5,
    y: 3,
    z: 5,
  });
  addCube({
    name: "side1middlemiddle",
    x: -4,
    y: 3,
    z: 5,
  });
  addCube({
    name: "side1middleright",
    x: 0.5,
    y: 3,
    z: 5,
  });
  addCube({
    name: "side1bottomleft",
    x: -8.5,
    y: -1.5,
    z: 5,
  });
  addCube({
    name: "side1bottommiddle",
    x: -4,
    y: -1.5,
    z: 5,
  });
  addCube({
    name: "side1bottomright",
    x: 0.5,
    y: -1.5,
    z: 5,
  });

  var pivot = new THREE.Group();
  scene.add(pivot);
  pivot.add(side1);
  side1.position.set(4, -3, -5);

  //scene.add(side1);

  function addCube(data) {
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = data.x;
    cube.position.y = data.y;
    cube.position.z = data.z;
    cube.rotation.set(0, 0, 0);
    cube.name = data.name;
    side1.add(cube);
  }

  $("#WebGL-output").append(renderer.domElement);
  //document.getElementById("WebGL-output").appendChild(renderer.domElement);
  renderScene();

  function renderScene() {
    stats.update();
    //side1.rotation.z += 0.02;
    pivot.rotation.z += 0.02;
    camera.position.x = controls.CameraPositionX;
    camera.position.y = controls.CameraPositionY;
    camera.position.z = controls.CameraPositionZ;
    spotLight.position.set(
      controls.SpotlightPositionX,
      controls.SpotlightPositionY,
      controls.SpotlightPositionZ
    );
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
}

init();
