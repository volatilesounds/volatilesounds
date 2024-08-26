import VSounds from '../../../vsounds-module/vsounds-main.js';

// Create custom camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// Initialize the game
const gameScene = new VSounds.GameScene('container', {
	camera: camera
});

// Create a reference box
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial( { color: 0x252525} );
const cube = new THREE.Mesh( geometry, material );
gameScene.addMesh(cube);

// Create a paper plane and add it to the game
const paperPlane = new VSounds.PaperPlane();
gameScene.addMesh(paperPlane.mesh);

// Initialize PlayerController
const playerController = new VSounds.PlayerController(camera, paperPlane.mesh);

// Set a custom game loop
gameScene.setGameLoop(() => {
    // Custom game loop logic
    //paperPlane.rotate(0.01, 0.01, 0.01);

	playerController.update();
});

// Initialize and start the animation loop
gameScene.animate();