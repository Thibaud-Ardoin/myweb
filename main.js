import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);

renderer.render(scene, camera);

const geomerty = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: "green", wireframe: true})
const torus = new THREE.Mesh(geomerty, material);
scene.add(torus)
torus.position.x = document.documentElement.clientHeight / 20
torus.position.y = document.documentElement.clientHeight / 20

console.log(torus.position.x)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  
  if (x < 1 / d1) {
      return n1 * x * x;
  } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

function addStar() {
  const geomerty = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: "green", wireframe: true})
  const star = new THREE.Mesh(geomerty, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z);
  scene.add(star)
}

function setupModels(data) {
  for (let i =0; i<data.scene.children.length; i++) {
    const model = data.scene.children[i];
    scene.add(model)
  }
}

function setupModel(data) {
  const model = data.scene.children;
  return model
}


// LINUX PINGUU
let linux
const loader = new GLTFLoader();
//const loadedData = await loader.loadAsync('Linux Penguin.gltf');
async function loadingLinux() {
  const loadedData = await loader.loadAsync('Linux Penguin.gltf');
  linux = setupModels(loadedData);
}
//loadingLinux()

// Tensorflow
let tensorflow 
async function loadingTensorflow() {
  const loadedData = await loader.loadAsync('Tensorflow.glb');
  tensorflow = setupModel(loadedData)[0]
  scene.add(tensorflow)
  tensorflow.position.x = document.documentElement.clientHeight / 30
  tensorflow.position.z = document.documentElement.clientHeight / 100
}
loadingTensorflow()

// PyTorch
let pytorch
async function loadingPytorch() {
  const loadedData = await loader.loadAsync('PyTorch.glb');
  pytorch = setupModel(loadedData)[1]
  pytorch.scale.set(1, 1, 1)
  scene.add(pytorch)

  pytorch.position.x = document.documentElement.clientHeight / 30
  pytorch.position.z = document.documentElement.clientHeight / 100
  pytorch.position.y = document.documentElement.clientHeight / 50

}
loadingPytorch()

// Python
let python
async function loadingPython() {
  const loadedData = await loader.loadAsync('Python.glb');
  python = setupModel(loadedData)[1]
  python.scale.set(5, 5, 5)
  scene.add(python)
  python.position.x = document.documentElement.clientHeight / 30
  python.position.y = -document.documentElement.clientHeight / 50
  python.position.z = document.documentElement.clientHeight / 100
}
loadingPython()

Array(200).fill().forEach(addStar)


function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  const b = document.documentElement.scrollHeight
  const h = document.documentElement.clientHeight
  let m = 22

  
  camera.position.z = 50 + t* -0.001
  camera.position.y =  t* -0.01
  //camera.lookAt(,  camera.position.y, 0 );
  camera.lookAt(new THREE.Vector3(0,camera.position.y,0));

  
  //camera.position.x = camera.position.x + t* -0.00001
  //camera.position.y = camera.position.y + t* -0.00001
  //console.log(t, b, h)
  torus.position.y = h/20 - h/10 * easeOutBounce(Math.abs(t)/b)
  //easeOutBounce(Math.abs(t )/b * 0.05)
  //console.log(torus.position.y)
  // torus.position.z = t* 0.005
}

document.body.onscroll = moveCamera

//const spaceTexture = new THREE.TextureLoader().load('')
//scene.background = spaceTexture

function animate() {
  requestAnimationFrame(animate)
  // Rotations
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.021

  //tensorflow.rotation.x += 0.01
  tensorflow.rotation.y += 0.05
  //tensorflow.rotation.z += 0.021

  pytorch.rotation.x += 0.01
  pytorch.rotation.y += 0.005
  pytorch.rotation.z += 0.021

  controls.update();
  
  renderer.render(scene, camera);

}

animate()