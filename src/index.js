//import
import * as THREE from "three";
import { AmbientLight } from "three";

// Window resize
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth * 0.9, window.innerWidth * 0.5);
}

// varriables
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
// camera.rotateX(0.13);

const renderer = new THREE.WebGLRenderer();
const container = document.querySelector(".game__board");

//light
const light = new THREE.PointLight(0x404040, 10, 100);
light.position.set(50, 10, 50);
scene.add(light);

//render
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// bacground
// scene.background = bgTexture;

renderer.setSize(container.offsetWidth * 0.8, container.offsetWidth * 0.5);
container.appendChild(renderer.domElement);

// plane

const firstPLaneTexture = new THREE.TextureLoader().load(
  "../assets/gradient.jpg"
);
const planeGeometry = new THREE.PlaneGeometry(30, 15);
const planeMaterial = new THREE.MeshBasicMaterial({
  map: firstPLaneTexture,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -10);
scene.add(plane);

// board
// change to GTLF object maked in blander
const boardGeometry = new THREE.CylinderGeometry(0.35, 0.35, 15, 32);
const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const cylinder1 = new THREE.Mesh(boardGeometry, boardMaterial);
const cylinder2 = new THREE.Mesh(boardGeometry, boardMaterial);
const cylinder3 = new THREE.Mesh(boardGeometry, boardMaterial);
const cylinder4 = new THREE.Mesh(boardGeometry, boardMaterial);
cylinder1.position.set(-5, 0, -10);
cylinder2.position.set(5, 0, -10);

cylinder3.position.set(0, 5, -10);
cylinder3.rotateZ(1.570796326795);

cylinder4.position.set(0, -5, -10);

scene.add(cylinder1, cylinder2, cylinder3);

function animate() {
  requestAnimationFrame(animate);

  // cylinder1.rotation.x += 0.01;
  // cylinder1.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
