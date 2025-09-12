import { useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  useEffect(()=>{
    const scene = new THREE.Scene();

    //referencing the canvas which we create in this app render
    const canvas = document.getElementById('app-canvas');
    var w = window.innerWidth;
    var h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({canvas, antialias: true });
    //renderer.setPixelRatio( 2.0); INCREASE QUALITY
    renderer.setClearColor( 0xF5F5F5, 1);
    renderer.setSize(w, h); //so that it takes the size of the element it is in
    
    const rootDiv = document.getElementById('vsounds-render');
    rootDiv.appendChild(renderer.domElement);

     
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
    
    /*
    // GROUND
    const groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    groundMat.color.setHSL( 0.095, 1, 0.75 );
    
    const ground = new THREE.Mesh( groundGeo, groundMat );
    ground.position.y = - 33;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add( ground );
    */
    
    //VARIABLES
    var delta = 0;
    
    //========================EVENT==================================//
    
    //Resize window
    var onWindowResize = function()
    {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
    }
    
    window.addEventListener('resize', onWindowResize);
    
    //========================MAIN PIPELINE=============================//
    
    //Game logic
    var update = function()
    {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    
      /*
      //Rotating camera
      delta += 0.01;
      camera.lookAt(cube.position);
      camera.position.x = Math.sin(delta) * 5;
      camera.position.z = Math.cos(delta) * 5;
      */
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
  },[]);

  return (
    <canvas id="app-canvas"/>
  )
}

export default App;
