const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = {};
let direction = 'right';
let score = 0;

// Generate random food position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize))
  };
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
  }
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Update the snake's position
function update() {
  // Create new head based on direction
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'up') head.y--;
  if (direction === 'down') head.y++;
  if (direction === 'left') head.x--;
  if (direction === 'right') head.x++;

  // Check for collisions
  if (head.x < 0 || head.x >= canvas.width / gridSize ||
      head.y < 0 || head.y >= canvas.height / gridSize ||
      checkCollision(head)) {
    gameOver();
    return;
  }

  // Add new head to the snake array
  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    // Remove tail if no food was eaten
    snake.pop();
  }

  // Clear canvas and draw game elements
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

// Check for collisions with snake's body
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Game over logic
function gameOver() {
  alert('Game Over! Your score: ' + score);
  clearInterval(gameLoop);
}

// Handle key presses for movement
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
      case 'W':
      if (direction !== 'down') direction = 'up';
      break;
    case 'S':
      if (direction !== 'up') direction = 'down';
      break;
    case 'A':
      if (direction !== 'right') direction = 'left';
      break;
    case 'D':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Start game loop
generateFood();
let gameLoop = setInterval(update, 100); // Update every 100ms
