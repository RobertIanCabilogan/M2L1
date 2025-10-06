import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );

  plane.position.x += velocity.x;
  plane.position.y += velocity.y;

  if (plane.position.x > boundX || plane.position.x < -boundX) {
    let dir = randomDirection(speed);
    velocity.x = dir.x;
    velocity.y = dir.y;
    plane.position.x = Math.max(-boundX, Math.min(boundX, plane.position.x));
    material.uniforms.tint.value = getRandomColor();
    //plane.scale.multiplyScalar(0.8); 
  }
  if (plane.position.y > boundY || plane.position.y < -boundY) {
    let dir = randomDirection(speed);
    velocity.x = dir.x;
    velocity.y = dir.y;
    plane.position.y = Math.max(-boundY, Math.min(boundY, plane.position.y));
    material.uniforms.tint.value = getRandomColor();
    //plane.scale.multiplyScalar(0.8); 
  }
  renderer.render(scene, camera);
}

function randomDirection(speed) {
  let x = Math.random() * 2 - 1;
  let y = Math.random() * 2 - 1;
  let length = Math.sqrt(x * x + y * y);
  if (length === 0) {
    x = 1;
    y = 0;
    length = 1;
  }
  return { x: (x / length) * speed, y: (y / length) * speed };
}

function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}