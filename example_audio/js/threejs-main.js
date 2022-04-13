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

//AUDIO GLOBAL
var context = new (window.AudioContext || window.webkitAudioContext)();

//========================AUDIO======================================//

function Sine()
{
	this.sampleRate;

	this.deltaPhase;
	this.currentPhase;
	this.frequency;

	this.setup = function(sampleRate)
	{
		this.sampleRate = sampleRate;
	}

	this.setFrequency = function(frequency)
	{
		this.frequency = frequency;
		this.deltaPhase = 2 * Math.PI * frequency/this.sampleRate;
		this.currentPhase = 0;
	}

	this.doSine = function()
	{
		var y = Math.sin(this.currentPhase);
		this.currentPhase += this.deltaPhase;
		if(this.currentPhase>= 2*Math.PI)
		{
			this.currentPhase = 2*Math.PI;
		}
		return y;
	}

	this.execute = function(buffer)
	{
		//the writing function
		for(let c = 0; c<buffer.writeBuff.numberOfChannels; ++c)
		{
			let phase = this.currentPhase;

			var data = buffer.writeBuff.getChannelData(c);
			for(let s = 0; s<buffer.writeBuff.length; ++s)
			{
				data[s] = Math.sin(phase);
				phase+=this.deltaPhase;
			}
		}

		this.currentPhase += (this.deltaPhase*buffer.writeBuff.length);
	}
}

//Double buffer - quick example
function DoubleBuffer()
{
	this.bufferLength = 44100;
	
	this.readBuff = context.createBuffer(2, this.bufferLength, context.sampleRate);
	this.writeBuff = context.createBuffer(2, this.bufferLength, context.sampleRate);

	//called to swap the buffer after we have written
	this.swap = function()
	{
		[this.readBuff, this.writeBuff] = [this.writeBuff, this.readBuff];
	};
}

var doubleBuffer = new DoubleBuffer();

var mySine = new Sine();
mySine.setup(context.sampleRate);
mySine.setFrequency(440);

var bufferLengthSec = doubleBuffer.bufferLength/context.sampleRate;

function execute()
{
	var source = context.createBufferSource();
	source.buffer = doubleBuffer.readBuff;
	source.connect(context.destination);
	source.start();

	//start the writing
	setTimeout(function(){
		//console.log("write");

		//mySine.execute(doubleBuffer);

		//random
		for(let c = 0; c<doubleBuffer.writeBuff.numberOfChannels; ++c)
		{
			var data = doubleBuffer.writeBuff.getChannelData(c);
			for(let s = 0; s<doubleBuffer.writeBuff.length; ++s)
			{
				data[s] = Math.random() * 2 - 1;
			}
		}

		doubleBuffer.swap();
	}, 0);

	setTimeout(execute, bufferLengthSec);
}

//audio source
var file = document.getElementById("audiofile");
var audio = document.getElementById("audio");

file.onclick = function(){
	//create a buffer
	var buffer = context.createBuffer(2, 2048, context.sampleRate);

	for(let c = 0; c<buffer.numberOfChannels; ++c)
	{
		var writeBuffer = buffer.getChannelData(c);
		for(let s = 0; s<buffer.length; ++s)
		{
			let random = Math.random() * 2 - 1;
			writeBuffer[s] = random; //as Math.random is 0-1
		}
	}

	//playSound(buffer);

	//callback function happening every buffer length in seconds
	//setTimeout(execute, 0);

	// function loadModule()
	// {
	// 	context.audioWorklet.addModule('random-noise-processor.js');
	// 	const randomNoiseNode = new AudioWorkletNode(context, 'random-noise-processor');
	// 	randomNoiseNode.connect(context.destination);
	// }

	// loadModule();



	const audioContext = new AudioContext();

	async function loadModules() {
		// Load multiple modules sequentially.
		return await context.audioWorklet.addModule('random-noise-processor.js');
	}

	loadModules().then(() => {
  		const workletNode = new AudioWorkletNode(audioContext, 'random-noise-processor');
  		workletNode.connect(audioContext.destination);
	});

}

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

function playSound(buffer)
{
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start();

	source.onended = function(){
		playSound(buffer);
	}
}

function playSineTone()
{
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
