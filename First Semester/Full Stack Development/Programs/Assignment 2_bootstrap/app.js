const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const playAgainButton = document.getElementsByTagName('button')[0]
const comment = document.querySelector('.comment')

let result = 0;
let currentTime = 10;
let hitPosition;
let timerID = null;
let countDownTimerId = null;

playAgainButton.addEventListener('click', () => {
    result = 0
    currentTime = 10;
    hitPosition = null;
    timeLeft.innerHTML = currentTime;
    score.innerHTML = result;
    comment.innerHTML = 'Play!'
    playAgainButton.disabled = true;
    moveMole();
})

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.innerHTML = result;
            hitPosition = null
        }
    })
});

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    });
    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id;
}

function moveMole() {
    timerID = setInterval(randomSquare, 500)
    countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {
    currentTime--;
    timeLeft.innerHTML = currentTime;
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerID)
        comment.innerHTML = 'Game Over! your final score is: ' + result;
        playAgainButton.disabled = false;
    }
}