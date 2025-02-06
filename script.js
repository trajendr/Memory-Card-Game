const gameBoard = document.querySelector(".game-board");
const restartButton = document.getElementById("restart");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍊", "🥝", "🍒"];
let cards = [...emojis, ...emojis]; // Duplicate to make pairs
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer;
let time = 60; // Countdown timer set to 60 seconds

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Start the game
function initGame() {
    gameBoard.innerHTML = "";
    cards = shuffle(cards);
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    time = 60;
    movesCounter.textContent = moves;
    timerDisplay.textContent = time;
    
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        if (time === 0) {
            clearInterval(timer);
            alert("Oops! Time's up. Game Over!");
            initGame();
        }
    }, 1000);

    cards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip the card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.textContent = this.dataset.emoji;
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if two flipped cards match
function checkMatch() {
    moves++;
    movesCounter.textContent = moves;

    let [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert("🎉 Congratulations! You completed it!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 800);
    }
}

// Restart game
restartButton.addEventListener("click", initGame);

// Initialize game on load
initGame();
