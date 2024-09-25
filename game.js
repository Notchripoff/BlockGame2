const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const loadingScreen = document.getElementById('loadingScreen');
const startScreen = document.getElementById('startScreen');
const nameButton = document.getElementById('nameButton');
const nameInput = document.getElementById('nameInput');
const startButton = document.getElementById('startButton');
const creditsButton = document.getElementById('creditsButton');
const credits = document.getElementById('credits');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerName = '';
let gameStarted = false;

// Show loading screen for a brief moment
setTimeout(() => {
    loadingScreen.style.display = 'none';
    startScreen.style.display = 'flex';
}, 2000); // Adjust loading time as necessary

// Choose name functionality
nameButton.addEventListener('click', () => {
    nameInput.style.display = 'inline';
    startButton.style.display = 'inline';
});

// Start game functionality
startButton.addEventListener('click', () => {
    playerName = nameInput.value || 'Player'; // Default name if none provided
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    gameStarted = true;
    gameLoop();
});

// Show credits
creditsButton.addEventListener('click', () => {
    credits.style.display = credits.style.display === 'none' ? 'block' : 'none';
});

// Game loop
function gameLoop() {
    if (gameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'brown';
        ctx.fillRect(100, 100, 50, 50); // Example block
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Welcome, ${playerName}!`, 10, 20);
        requestAnimationFrame(gameLoop);
    }
}

