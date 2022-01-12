import * as THREE from "three";
import { AmbientLight } from "three";

let scene;
let renderer;
let camera;
let clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const boardMeshs = [];

init();

function init() {
  scene = new THREE.Scene();
  initRenderer();
  initCamera();
  scene.add(camera);

  //light
  const light = new THREE.PointLight(0x404040, 10, 30);
  const light2 = new THREE.PointLight(0x404040, 10, 30);
  light.position.set(-0, 10, 10);
  light2.position.set(-5, -25, 10);
  scene.add(light, light2);

  createBoard();
  animate();
}

function initRenderer() {
  const container = document.querySelector(".game__board");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth * 0.8, container.offsetWidth * 0.5);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000);
  container.appendChild(renderer.domElement);
}

function initCamera() {
  console.log(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    110,
    renderer.domElement.width / renderer.domElement.height,
    1,
    2000
  );
  camera.position.z = 5;
  camera.position.y -= 8;
  camera.rotateX(0.15);
  camera.rotateY(0.03);
  camera.rotateZ(0.03);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

// Window resize

function onWindowResize() {
  camera.aspect = 4 / 3;
  renderer.setSize(window.innerWidth * 0.9, window.innerWidth * 0.5);
}

function createBoard() {
  let color = new THREE.Color("rgb(178, 0, 114)");
  const boardGeometry = new THREE.BoxGeometry(5, 5, 0.5);

  for (let i = 0; i < 9; i++) {
    const boardMaterial = new THREE.MeshStandardMaterial({ color: color });
    const field = new THREE.Mesh(boardGeometry, boardMaterial);

    if (i < 3) {
      field.position.set(-5 + i * 5.5, 0, -5);
    } else if (i >= 3 && i < 6) {
      field.position.set(-5 + (i - 3) * 5.5, 0 - 5.5, -5);
    } else {
      field.position.set(-5 + (i - 6) * 5.5, 0 - 11, -5);
    }
    field.player = "";
    field.boardId = i;

    boardMeshs.push(field);

    scene.add(field);
  }
}

function renderPlayerOnBoard(field, player = "circle") {
  console.log(field);
  const { x, y, z } = field.object.position;

  switch (player) {
    case "cross":
      console.log(player);
      break;
    case "circle":
      field.object.player = "circle";
      const geometry = new THREE.TorusGeometry(1.5, 0.35, 32, 300);
      const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
      const torus = new THREE.Mesh(geometry, material);
      torus.position.set(x, y, z + 0.5);
      scene.add(torus);
      console.log(boardMeshs);
      break;
    default:
      console.log("Something went ");
  }
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  intersects[0] && console.log(intersects[0]);

  intersects[0] && renderPlayerOnBoard(intersects[0]);

  // for (let i = 0; i < intersects.length; i++) {
  //   intersects[i].object.material.color.set(0xff0000);
  // }
}

function onMouseMove(event) {
  let canvas = document.querySelector("canvas");
  mouse.x = (event.offsetX / canvas.clientWidth) * 2 - 1;
  mouse.y = -(event.offsetY / canvas.clientHeight) * 2 + 1;
  // console.log(mouse.x, mouse.y);
}

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("click", onMouseClick, false);
window.addEventListener("mousemove", onMouseMove, false);
