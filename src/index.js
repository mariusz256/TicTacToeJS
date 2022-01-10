//import
import * as THREE from "three";

// Window resize
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth * 0.9, window.innerWidth * 0.5);
};

window.addEventListener("resize", onWindowResize, false);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
const container = document.querySelector(".game__board");

renderer.setSize(container.offsetWidth * 0.8, container.offsetWidth * 0.5);
container.appendChild(renderer.domElement);

console.log(container.offsetWidth, container.offsetHeight);
