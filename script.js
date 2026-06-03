let randomNumber =
    Math.floor(Math.random() * 100) + 1;

let attempts = 0;
let lives = 10;
let timeLeft = 60;


const input =
    document.getElementById("guessInput");

const message =
    document.getElementById("message");

const timerElement =
    document.getElementById("timer");

const livesElement =
    document.getElementById("lives");

const bestScoreElement =
    document.getElementById("bestScore");

const guessBtn =
    document.getElementById("guessBtn");

const restartBtn =
    document.getElementById("restartBtn");


// 🏆 Best Score

let bestScore =
    localStorage.getItem("bestScore");

if (bestScore) {

    bestScoreElement.textContent =
        bestScore;
}


// 🎯 Guess Button

guessBtn.addEventListener(
    "click",
    checkGuess
);


// 🔄 Restart Button

restartBtn.addEventListener(
    "click",
    restartGame
);


// ⌨️ Enter Key

input.addEventListener(
    "keypress",

    function(event) {

        if (event.key === "Enter") {

            checkGuess();
        }
    }
);


// ⏳ Timer

const countdown = setInterval(() => {

    timeLeft--;

    timerElement.textContent =
        timeLeft;

    if (timeLeft <= 0) {

        clearInterval(countdown);

        message.innerHTML =
            "💀 Time Over!";

        disableGame();
    }

}, 1000);


// 🎮 Main Game Logic

function checkGuess() {

    const userGuess =
        Number(input.value);

    if (!userGuess) return;

    attempts++;

    document.getElementById("attempts")
        .textContent =
        "Attempts: " + attempts;

    let difference =
        Math.abs(userGuess - randomNumber);


    // 🎉 WIN

    if (userGuess === randomNumber) {

        message.innerHTML =
            "🎉 Correct Number!<br>🏆 You're a Legend!";

        message.style.color = "#22c55e";

        confetti({

            particleCount: 300,

            spread: 150,

            origin: { y: 0.6 }

        });

        clearInterval(countdown);

        // 🏆 Save Best Score

        if (
            !bestScore ||
            attempts < bestScore
        ) {

            localStorage.setItem(
                "bestScore",
                attempts
            );

            bestScoreElement.textContent =
                attempts;
        }

        disableGame();
    }


    // 🔥 SUPER CLOSE

    else if (difference <= 5) {

        message.innerHTML =
            "🔥 SUPER CLOSE!<br>You're almost there!";

        message.style.color =
            "#f97316";
    }


    // 🌟 CLOSE

    else if (difference <= 10) {

        message.innerHTML =
            "🌟 Getting Close!";

        message.style.color =
            "#eab308";
    }


    // 📈 HIGH

    else if (userGuess > randomNumber) {

        message.innerHTML =
            "📈 Too High!";

        message.style.color =
            "#fb7185";
    }


    // 📉 LOW

    else {

        message.innerHTML =
            "📉 Too Low!";

        message.style.color =
            "#38bdf8";
    }


    // ❤️ Lives

    lives--;

    livesElement.textContent =
        lives;

    if (lives <= 0) {

        message.innerHTML =
            "💀 Game Over!";

        clearInterval(countdown);

        disableGame();
    }


    // 🧠 Smart Hints

    if (attempts === 3) {

        message.innerHTML +=
            "<br>🧠 Hint: Try middle numbers.";
    }

    if (attempts === 6) {

        message.innerHTML +=
            "<br>⚡ Think strategically.";
    }

    if (attempts === 9) {

        message.innerHTML +=
            "<br>🚀 Final chances!";
    }

    input.value = "";
}


// 🔒 Disable Game

function disableGame() {

    input.disabled = true;

    guessBtn.disabled = true;
}


// 🔄 Restart Game

function restartGame() {

    location.reload();
}