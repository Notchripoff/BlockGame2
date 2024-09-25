const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let blocks = [];

// Function to create blocks
function createBlock(x, y) {
    blocks.push({ x, y, size: 50 });
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach(block => {
        ctx.fillStyle = 'brown';
        ctx.fillRect(block.x, block.y, block.size, block.size);
    });
    requestAnimationFrame(gameLoop);
}

// Initialize game
createBlock(100, 100); // Example block
gameLoop();
