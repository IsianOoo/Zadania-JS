const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let balls = [];
let requestId;
let running = false;

const BALL_COUNT = 50; 
const BALL_RADIUS = 10;
const MAX_SPEED = 5;
const MIN_DISTANCE = 100;

const init =()=> {
  balls = [];
  for (let i = 0; i < BALL_COUNT; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * MAX_SPEED * 2,
      dy: (Math.random() - 0.5) * MAX_SPEED * 2,
    });
  }
}

const drawBall =(x, y)=> {
  ctx.beginPath();
  ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

const drawLine =(ball1, ball2)=> {
  ctx.beginPath();
  ctx.moveTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
  ctx.closePath();
}

const update =()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - BALL_RADIUS < 0 || ball.x + BALL_RADIUS > canvas.width) {
      ball.dx *= -1;
    }
    if (ball.y - BALL_RADIUS < 0 || ball.y + BALL_RADIUS > canvas.height) {
      ball.dy *= -1;
    }

    drawBall(ball.x, ball.y);

    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2);
      if (distance < MIN_DISTANCE) {
        drawLine(ball, otherBall);
      }
    }
  }

  requestId = requestAnimationFrame(update);
}

document.getElementById('startButton').addEventListener('click', () => {
  if (!running) {
    init();
    update();
    running = true;
  }
});

document.getElementById('resetButton').addEventListener('click', () => {
  if (running) {
    cancelAnimationFrame(requestId);
    running = false;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (!running) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
