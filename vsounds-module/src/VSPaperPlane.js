export class VSPaperPlane {
    constructor() {
        this.mesh = this.createPaperPlane();
        this.mesh.position.set(0, 0, 0);  // Initial position
        this.mesh.rotation.set(0, 0, 0);  // Initial rotation
    }

    createPaperPlane() {
        const geometry = new THREE.BufferGeometry();

        const tip = [0, 0, 0];
        const bottom = [0, -1, -0.3];

        // Wings
        const leftWing = [-0.5, -1.5, -0.2];
        const rightWing = [-leftWing[0], leftWing[1], leftWing[2]];

        // Body
        const leftBody = [-0.1, -1.5, 0];
        const rightBody = [-leftBody[0], leftBody[1], 0];

        // Vertices for the paper plane
        const vertices = new Float32Array([
            // Left Wing Triangle
            ...tip,
            ...leftWing,
            ...leftBody,
 
            // Right Body Triangle
            ...tip,
            ...rightWing,
            ...rightBody,

            // Left Body Triangle
            ...tip,
            ...leftBody,
            ...bottom,
 
            // Right Body Triangle
            ...tip,
            ...rightBody,
            ...bottom
        ]);

        // Indices to create the triangles
        const indices = new Uint16Array([
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9, 10, 11
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        return new THREE.Mesh(geometry, material);
    }

    rotate(x, y, z) {
        this.mesh.rotation.x += x;
        this.mesh.rotation.y += y;
        this.mesh.rotation.z += z;
    }

    move(x, y, z) {
        this.mesh.position.x += x;
        this.mesh.position.y += y;
        this.mesh.position.z += z;
    }
}
