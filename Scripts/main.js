import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./Textures/pngfind.com-sprite-logo-png-905995.png');
const geometry = new THREE.PlaneGeometry(2, 1);

const tintColor = new THREE.Color(0xFFFFFF);

//had to use ai uuuuuuu ;-;
const material = new THREE.ShaderMaterial({
  uniforms: {
    map: { value: texture },
    tint: { value: tintColor }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 tint;
    varying vec2 vUv;
    void main() {
      vec4 texColor = texture2D(map, vUv);
      float isBlack = step(0.1, 1.0 - texColor.r) * step(0.1, 1.0 - texColor.g) * step(0.1, 1.0 - texColor.b);
      vec3 finalColor = mix(texColor.rgb, tint, isBlack);
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `,
  transparent: true
});


const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 5;
let velocity = { x: 0.05, y: 0.05 };
const speed = 0.03; 
function animate() {

  const boundX = 7; 
  const boundY = 4;

  

  plane.position.x += velocity.x;
  plane.position.y += velocity.y;

  if (plane.position.x > boundX || plane.position.x < -boundX) {
    let dir = randomDirection(speed);
    velocity.x = dir.x;
    velocity.y = dir.y;
    plane.position.x = Math.max(-boundX, Math.min(boundX, plane.position.x));
    material.uniforms.tint.value = getRandomColor();
    plane.scale.multiplyScalar(0.8); 
  }
  if (plane.position.y > boundY || plane.position.y < -boundY) {
    let dir = randomDirection(speed);
    velocity.x = dir.x;
    velocity.y = dir.y;
    plane.position.y = Math.max(-boundY, Math.min(boundY, plane.position.y));
    material.uniforms.tint.value = getRandomColor();
    plane.scale.multiplyScalar(0.8); 
  }
  renderer.render(scene, camera);
}

function randomDirection(speed) {
  let angle = Math.random() * Math.PI * 2;
  let x = Math.cos(angle);
  let y = Math.sin(angle);
  let length = Math.sqrt(x * x + y * y);
  return { x: (x / length) * speed, y: (y / length) * speed };
}

function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}