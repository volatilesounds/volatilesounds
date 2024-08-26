export class VSPlayerController {
    constructor(camera, object) {
        this.camera = camera;
        this.object = object;
        this.keys = {};
        this.cameraMode = 'third'; // 'first' or 'third'
        this.moveSpeed = 0.05;
        this.rotateSpeed = 0.02;
        this.thirdPersonDistance = 5;
        this.cameraOffset = new THREE.Vector3(0, 2, this.thirdPersonDistance);

        // Event listeners
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(event) {
        this.keys[event.code] = true;
    }

    handleKeyUp(event) {
        this.keys[event.code] = false;
    }

    update() {
        // Movement controls
        if (this.keys['ArrowUp']){
            this.camera.position.z -= this.moveSpeed;
            this.object.position.z -= this.moveSpeed;
        }
        if (this.keys['ArrowDown']) this.object.position.z += this.moveSpeed;
        if (this.keys['ArrowLeft']) this.object.position.x -= this.moveSpeed;
        if (this.keys['ArrowRight']) this.object.position.x += this.moveSpeed;
        
        // Rotation controls
        if (this.keys['KeyW']) this.object.rotation.x -= this.rotateSpeed;
        if (this.keys['KeyS']) this.object.rotation.x += this.rotateSpeed;
        if (this.keys['KeyA']) this.object.rotation.y -= this.rotateSpeed;
        if (this.keys['KeyD']) this.object.rotation.y += this.rotateSpeed;
        
        // Toggle camera mode
        if (this.keys['KeyT']) this.toggleCameraMode();

        // Update camera position based on the current mode
        this.updateCameraPosition();
    }

    toggleCameraMode() {
        this.cameraMode = this.cameraMode === 'third' ? 'first' : 'third';
        if (this.cameraMode === 'first') {
            // Adjust the camera for the first-person view
            this.camera.position.copy(this.object.position);
            this.camera.rotation.copy(this.object.rotation);
            this.camera.position.z += 2; // Small offset for first-person view
        }
    }

    updateCameraPosition() {
        if (this.cameraMode === 'third') {
            // Third-person view
            this.camera.position.copy(this.object.position).add(this.cameraOffset);
            this.camera.lookAt(this.object.position);
        } else if (this.cameraMode === 'first') {
            // First-person view
            this.camera.position.copy(this.object.position).add(new THREE.Vector3(0, 0, 2));
            this.camera.rotation.copy(this.object.rotation);
        }
    }
}
