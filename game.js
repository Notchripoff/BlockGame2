const canvas = document.getElementById('gameCanvas');
const loadingScreen = document.getElementById('loadingScreen');
const startScreen = document.getElementById('startScreen');
const nameButton = document.getElementById('nameButton');
const nameInput = document.getElementById('nameInput');
const startButton = document.getElementById('startButton');
const creditsButton = document.getElementById('creditsButton');
const credits = document.getElementById('credits');

let scene, camera, renderer;
let playerName = 'Player';
let gameStarted = false;
let isPointerLocked = false;
let movementSpeed = 0.1;

// Initialize Three.js
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a simple ground
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Position the camera
    camera.position.set(0, 1.6, 0); // Eye level
    document.body.appendChild(renderer.domElement);

    // Mouse movement
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', () => {
        if (!isPointerLocked) {
            document.body.requestPointerLock();
        }
    });
    document.addEventListener('pointerlockchange', () => {
        isPointerLocked = document.pointerLockElement === document.body;
    });
    
    // Basic controls
    document.addEventListener('keydown', onDocumentKeyDown);
}

// Game loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start game functionality
startButton.addEventListener('click', () => {
    playerName = nameInput.value || 'Player'; // Default name if none provided
    loadingScreen.style.display = 'none';
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    gameStarted = true;
    init();
    animate();
});

// Basic key controls
function onDocumentKeyDown(event) {
    const keyCode = event.which;
    if (keyCode === 87) { // W key
        camera.position.z -= movementSpeed;
    }
    if (keyCode === 83) { // S key
        camera.position.z += movementSpeed;
    }
    if (keyCode === 65) { // A key
        camera.position.x -= movementSpeed;
    }
    if (keyCode === 68) { // D key
        camera.position.x += movementSpeed;
    }
}

// Handle mouse movement for looking around
function onMouseMove(event) {
    if (isPointerLocked) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        camera.rotation.y -= movementX * 0.002; // Adjust sensitivity
        camera.rotation.x -= movementY * 0.002;

        // Limit vertical rotation
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }
}

// Show loading screen for a brief moment
setTimeout(() => {
    loadingScreen.style.display = 'none';
    startScreen.style.display = 'flex';
}, 2000);

