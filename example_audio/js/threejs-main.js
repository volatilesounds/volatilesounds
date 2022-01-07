const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialiasing: false });
//renderer.setPixelRatio( 2.0); INCREASE QUALITY
renderer.setClearColor( 0xF5F5F5, 1);
 var container = document.getElementsByClassName('container')[0];
 var w = container.offsetWidth;
 var h = container.offsetHeight;
 renderer.setSize(w, h);
container.appendChild(renderer.domElement);
 
const camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial( { color: 0x252525} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

//LIGHT

//Point light
const light = new THREE.PointLight( 0xffffff, 2.0);
light.position.set( 0, 0.5, 5);
scene.add( light );

//VARIABLES
var delta = 0;

//========================AUDIO======================================//

//audio source
var file = document.getElementById("audiofile");
var audio = document.getElementById("audio");

file.onchange = function(){

	// audio.classList.add('active');
	let files = this.files;

	audio.src = URL.createObjectURL(files[0]);
	audio.load();
	audio.play();
}

function analyseAudio()
{

}

function playSineTone()
{
	var context = new AudioContext();

	//create oscillator
	var oscNode = context.createOscillator();
	oscNode.frequency = 220;
	oscNode.type = "sine";

	//create gain
	var gainNode = context.createGain();
	gainNode.gain.value = 0.2;
	
	oscNode.connect(gainNode).connect(context.destination);
	oscNode.start();
}




//========================EVENT==================================//

//Resize window
var onWindowResize = function()
{
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	camera.aspect = container.offsetWidth/container.offsetHeight;
	camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

//========================MAIN PIPELINE=============================//

//Game logic
var update = function()
{
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	
	//Rotating camera
	// delta += 0.01;
	// camera.lookAt(cube.position);
	// camera.position.x = Math.sin(delta) * 5;
	// camera.position.z = Math.cos(delta) * 5;
	
}

//Draw scene
var render = function()
{
	renderer.render(scene, camera);
}

//Run game loop (update, render, repeat)
var GameLoop = function()
{
	requestAnimationFrame(GameLoop);

	update();
	render();

}

GameLoop();
