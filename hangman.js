var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function createGallow() {
    ctx.moveTo(50,250);
    ctx.lineTo(100,250);

    ctx.moveTo(75,250);
    ctx.lineTo(75,30);

    ctx.moveTo(75,30);
    ctx.lineTo(155,30);

    ctx.moveTo(155,30);
    ctx.lineTo(155,60);
    ctx.stroke();
}

const wordsList = ["footbal", "hockey", "miracle", "future", "house", "furniture", "planet", "technology", "information", "business", "keyboard", "charcoal", "music", "antropology", "travel", "world", "glasses"];
const wordToGuess = [];
let word;
let numberSpacesToFill;

function generateNewWord () {
    createGallow();
    let x = Math.floor(Math.random() * wordsList.length);
    word = wordsList[x];
    let wordLength = word.length;
    numberSpacesToFill = wordLength - 2;
    let line = "_";
    wordToGuess[0] = word[0];
    let firstLetter = wordToGuess[0];
    wordToGuess[wordLength - 1] = word[wordLength - 1];
    let lastLetter = wordToGuess[wordLength - 1];
    for(let i = 1; i < wordLength - 1; ++i) {
        if (word[i] === firstLetter) { 
            wordToGuess[i] = firstLetter;
            --numberSpacesToFill;
        } else if (word[i] === lastLetter) {
            wordToGuess[i] = lastLetter;
            --numberSpacesToFill;
        } else {
            wordToGuess[i] = line;
        }
    }
    document.getElementById("displayWord").innerHTML = wordToGuess.join(' ');
    document.getElementById("newWordButton").disabled = true;
}

let life = 6;
let filledSpaces = 0;
document.addEventListener('keypress', gamePlay);

function gamePlay(event) {
    let letterPressed = event.key;
    let foundLetter = 0;
    for (let i = 1; i < wordToGuess.length - 1; ++i) {
        if (letterPressed === word[i] && wordToGuess[i] === "_") {
            wordToGuess[i] = letterPressed;
            document.getElementById("displayWord").innerHTML = wordToGuess.join(' ');
            ++filledSpaces;
            foundLetter = 1;
        }  
    }
    if (foundLetter === 0) {
        --life;
    } else if (filledSpaces === numberSpacesToFill) {
        document.getElementById("displayResult").innerHTML = "You won!";
        let winnerResult = document.getElementById("displayResult");
        winnerResult.style.color = "green";
    }

    if (life === 5) {
        ctx.beginPath();
        ctx.arc(155,75,15,0, 2*Math.PI); //head
        ctx.stroke();
    } else if (life === 4) {
        ctx.moveTo(155,90); //body
        ctx.lineTo(155,175);
        ctx.stroke();
    } else if (life === 3) {
        ctx.moveTo(155,110); //left hand
        ctx.lineTo(130, 140);
        ctx.stroke();
    } else if (life === 2) {
        ctx.moveTo(155, 110); //right hand
        ctx.lineTo(180, 140);
        ctx.stroke();
    } else if (life === 1) {
        ctx.moveTo(155, 175); //left leg
        ctx.lineTo(130, 205);
        ctx.stroke();
    } else if (life === 0) {
        ctx.moveTo(155, 175); //right leg
        ctx.lineTo(180, 205);
        ctx.stroke();
        document.getElementById("displayResult").innerHTML = "You lost!";
        let loserResult = document.getElementById("displayResult");
        loserResult.style.color = "red";
    }
}

