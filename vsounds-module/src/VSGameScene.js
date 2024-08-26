export class VSGameScene {
    constructor(containerSelector, options = {}) {
        this.container = document.getElementsByClassName(containerSelector)[0];
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.options = options;
        this.objects = [];
        this.customGameLoop = null; // Store the custom game loop function

        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLight();

        this.container.appendChild(this.renderer.domElement);
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initCamera() {
        if (this.options.camera) {
            this.camera = this.options.camera;
        } else {
            this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
            this.camera.position.z = 5;
        }
    }

    initRenderer() {
        if (this.options.renderer) {
            this.renderer = this.options.renderer;
        } else {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setClearColor(0xF5F5F5, 1);
            this.renderer.setSize(this.width, this.height);
        }
    }

    initLight() {
        if (this.options.light) {
            this.scene.add(this.options.light);
        } else {
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(5, 5, 5).normalize();
            this.scene.add(light);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Execute custom game loop logic if provided
        if (this.customGameLoop) {
            this.customGameLoop();
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
    }

    setGameLoop(callback) {
        this.customGameLoop = callback;
    }

    addMesh(mesh) {
        this.objects.push(mesh);
        this.scene.add(mesh);
    }

    removeMesh(mesh) {
        this.objects = this.objects.filter(obj => obj !== mesh);
        this.scene.remove(mesh);
    }
}

