// And Arden created the world: https://threejs.org/docs/#api/scenes/Scene
var gui = new dat.GUI();
const scene = new THREE.Scene();

// Set Camera: https://threejs.org/docs/#api/cameras/PerspectiveCamera
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 20 );
camera.position.z = 10;

// Set WebGLRenderer: https://threejs.org/docs/#api/renderers/WebGLRenderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( '#ffffff', 1 );
document.body.appendChild( renderer.domElement );

// Add Orbit controls: 
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js
const orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;

// And there was light: https://threejs.org/docs/#api/lights/PointLight
setLights();

function setLights() {
    const spotLight = new THREE.SpotLight( 0xffffff, 1);
    spotLight.position.set( 0, 100, 0 );
    const lights = [];
    lights[ 0 ] = new THREE.AmbientLight( 0xffffff, 2 );
    lights[1] = new THREE.PointLight( 0xffffff, 0.5, 100 );
    lights[2] = new THREE.PointLight( 0xffffff, 0.5, 100 );
    lights[ 0 ].position.set(  0, 20, 20 );
    lights[1].position.set( 0, 0, 50 );
    lights[2].position.set( 0, 0, -50 );

    scene.add( spotLight );
    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
}

// Const swordMaterial
const mesh = new THREE.MeshPhysicalMaterial({
    color: '#ff0000',
    emissive: 0x000000,
    side: THREE.DoubleSide,
    flatShading: true,
});
var material = chooseFromHash( gui, mesh, 'G color' );
// Object loader https://threejs.org/docs/#examples/loaders/OBJLoader
const loader = new THREE.OBJLoader();
// load a resource
loader.load(
	// resource: https://free3d.com/3d-model/diamond-sword-3597.html    
	'/examples/3d-obj-loader/assets/g.obj',
	// called when resource is loaded
	object => {
        object.traverse(( child ) => {
                child.material = material;
                child.position.y =- 1.5;
        });
        scene.add( object );
        
    },
	xhr => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
	error => console.log( 'An error happened' ),
);

var geometry = new THREE.BoxGeometry( 6, 1, 3 );
var cubeMaterial = chooseFromHash( gui, mesh, 'Rectangle color' );
var cube = new THREE.Mesh( geometry, cubeMaterial );
cube.position.y -= 2.7;
cube.position.z -= 0.5;
cube.position.x += 0.75;
scene.add( cube );

guiScene( gui, scene, camera );

const render = () => {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
}

window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

render();