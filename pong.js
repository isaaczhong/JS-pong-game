const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 2,
    dx: 2,
    dy: 2
};

const paddleWidth = 15, paddleHeight = 80;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = leftPaddleY;

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fillStyle = '#fff';
    context.fill();
}

function drawPaddle(x, y) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; 
    }

    if(ball.y + ball.radius > leftPaddleY && ball.y - ball.radius < leftPaddleY + paddleHeight && ball.dx < 0) {
        if(ball.x - ball.radius < paddleWidth) {
            ball.dx *= -1;
        }
    }

    if(ball.y + ball.radius > rightPaddleY && ball.y - ball.radius < rightPaddleY + paddleHeight && ball.dx > 0) {
        if(ball.x + ball.radius > canvas.width - paddleWidth) {
            ball.dx *= -1;
        }
    }
}

canvas.addEventListener('mousemove', function(e) {
    let rect = canvas.getBoundingClientRect();
    rightPaddleY = e.clientY - rect.top - paddleHeight / 2;
});

setInterval(update, 10);
