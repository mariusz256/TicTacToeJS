//import
import * as THREE from "three";
import { AmbientLight } from "three";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const boardMeshs = [];

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  2,
  1000
);

camera.position.z = 5;
camera.position.y -= 8;
camera.rotateX(0.15);
camera.rotateY(0.03);
camera.rotateZ(0.03);

//light
const light = new THREE.PointLight(0x404040, 10, 30);
const light2 = new THREE.PointLight(0x404040, 10, 30);
light.position.set(-0, 0, 10);
light2.position.set(-15, -15, 0);
scene.add(light, light2);

//render
const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// plane

// const firstPLaneTexture = new THREE.TextureLoader().load(
//   "../assets/gradient.jpg"
// );
// const planeGeometry = new THREE.PlaneGeometry(30, 15);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   map: firstPLaneTexture,
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.position.set(0, 0, -10);
// scene.add(plane);

// // board
// let color = new THREE.Color("rgb(178, 0, 114)");
// const boardMaterial = new THREE.MeshStandardMaterial({ color: color });
// const boardGeometry = new THREE.BoxGeometry(5, 5, 0.5);
// const field = new THREE.Mesh(boardGeometry, boardMaterial);
// const field2 = new THREE.Mesh(boardGeometry, boardMaterial);

// field.position.set(-5, 0, -5);

// scene.add(field, field2);
createBoard();

const container = document.querySelector(".game__board");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.offsetWidth * 0.8, container.offsetWidth * 0.5);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);
container.appendChild(renderer.domElement);

animate();

function animate() {
  requestAnimationFrame(animate);

  // cylinder1.rotation.x += 0.01;
  // cylinder1.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Window resize

function onWindowResize() {
  camera.aspect = 4 / 3;
  renderer.setSize(window.innerWidth * 0.9, window.innerWidth * 0.5);
}

function createBoard() {
  let color = new THREE.Color("rgb(178, 0, 114)");
  const boardMaterial = new THREE.MeshStandardMaterial({ color: color });
  const boardGeometry = new THREE.BoxGeometry(5, 5, 0.5);

  for (let i = 0; i < 9; i++) {
    const field = new THREE.Mesh(boardGeometry, boardMaterial);

    if (i < 3) {
      field.position.set(-5 + i * 5.5, 0, -5);
    } else if (i >= 3 && i < 6) {
      field.position.set(-5 + (i - 3) * 5.5, 0 - 5.5, -5);
    } else {
      field.position.set(-5 + (i - 6) * 5.5, 0 - 11, -5);
    }

    boardMeshs.push(field);

    scene.add(field);
  }
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);

  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000);
  }
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(mouse.x, mouse.y);
}

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("click", onMouseClick, false);
window.addEventListener("mousemove", onMouseMove, false);
