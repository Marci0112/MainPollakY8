<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hangman Game JavaScript | CodingNepal</title>
    <link rel="stylesheet" href="css/hangman.css">
    <style>
        .container {
    
        width: 60vw;
    
}
@media only screen and (max-width: 1200px) {
  .container {
    width: 80vw;
  }
}
@media only screen and (max-width: 960px) {
  .container {
    width: 98vw;
  }
}

.word{
    display: flex;
    gap: 5px;
}
    </style>
</head>
<body>
    <div class="game-modal">
        <div class="content">
            <img src="#" alt="gif">
            <h4>Game Over!</h4>
            <p>A szó <b>rainbow</b> volt</p>
            <button>Próbáld újra</button>
        </div>
    </div>
    <div class="container">
        <div class="hangman-box">
            <img src="#" draggable="false" alt="hangman-img">
            <h1>Akasztófa(angol szavakkal)</h1>
        </div>
        <div class="game-box">
            <ul class="word-display"></ul>
            <h4 class="hint-text">Hint: <b></b></h4>
            <h4 class="guesses-text">Incorrect guesses: <b></b></h4>
            <div class="keyboard"></div>
        </div>
    </div>
    
    <script>
    const wordDisplay = document.querySelector(".word-display");
    const guessesText = document.querySelector(".guesses-text b");
    const keyboardDiv = document.querySelector(".keyboard");
    const hangmanImage = document.querySelector(".hangman-box img");
    const gameModal = document.querySelector(".game-modal");
    const playAgainBtn = gameModal.querySelector("button");

    // Initializing game variables
    let currentWord, correctLetters, wrongGuessCount;
    const maxGuesses = 6;

    const resetGame = () => {
        correctLetters = [];
        wrongGuessCount = 0;
        hangmanImage.src = "images/hangman-0.svg";
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        wordDisplay.innerHTML = currentWord
  .split(/\s+/) // A szöveg szavakra bontása szóközök mentén
  .map(word => {
    // Minden szó esetén: az egyes betűket li elemekbe tesszük
    const lettersHTML = word
      .split("") // Szó betűire bontása
      .map(letter => `<li class="letter"></li>`)
      .join("");

    // A betűket tartalmazó li elemeket egy div-be csomagoljuk
    return `<div class="word">${lettersHTML}</div>`;
  })
  .join("");


        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
        gameModal.classList.remove("show");
        document.querySelectorAll(".word-display .space").forEach(space => space.classList.add("guessed"));
    };

    const getRandomWord = () => {
    fetch('getWord.php')  // AJAX hívás a PHP fájlhoz
        .then(response => response.json())
        .then(data => {
            // Ellenőrizzük, hogy a válasz hibát tartalmaz-e
            if (data.error) {
                console.error('Error fetching the word:', data.error);
                return;
            }

            currentWord = data.word;
            document.querySelector(".hint-text b").innerText = data.category;
            resetGame();
        })
        .catch(error => {
            console.error('Error fetching the word:', error);
        });
};


    const gameOver = (isVictory) => {
        const modalText = isVictory ? `A helyes válasz:` : 'A helyes válasz:';
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? 'Gratulálok' : 'Game Over!';
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    };

    const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        let liIndex = 0; // Új index változó a li elemekhez
        [...currentWord].forEach((letter) => {
            if (letter === ' ') {
                return; // Szóköz kihagyása
            }
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[liIndex].innerText = letter;
                wordDisplay.querySelectorAll("li")[liIndex].classList.add("guessed");
            }
            liIndex++; // Csak nem szóköz után növeljük
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) return gameOver(false);

    const totalLetters = currentWord.replace(/\s/g, "").length;
    if (correctLetters.length === totalLetters) return gameOver(true);
};

    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
    }

    getRandomWord();  // első játék indítása
    playAgainBtn.addEventListener("click", getRandomWord);  // új játék indítása
</script>

</body>
</html>