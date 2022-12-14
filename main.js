/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels

const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Levels

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

// Dealing with levels
let easyMode = document.getElementById("easy");
let normalMode = document.getElementById("normal");
let hardMode = document.getElementById("hard");

// if (easyMode.checked) {
//   defaultLevelName = "Easy";
//   defaultLevelSeconds = lvls[defaultLevelName];
// } else if (normalMode.checked) {
//   defaultLevelName = "Normal";
//   defaultLevelSeconds = lvls[defaultLevelName];
// } else if (hardMode.checked) {
//   defaultLevelName = "Hard";
//   defaultLevelSeconds = lvls[defaultLevelName];
// }

easyMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    defaultLevelName = "Easy";
    defaultLevelSeconds = lvls[defaultLevelName];
  }
});
// Catch Selectors

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let scoreValue = ""; // Empty string to store the scores
let date = new Date(); // Create Realtime Date
let currentDate =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

// Setting Level Name + Seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event

input.onpaste = function () {
  return false;
};

// Start Game

startButton.onclick = function () {
  this.remove();
  input.focus();

  // Call Generate Word Function
  genWords();
};

// Generate Word Function
function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];

  // Get Word Index
  let wordIndex = words.indexOf(randomWord);

  // Remove This Word From Array
  words.splice(wordIndex, 1);

  // Show The Random Word
  theWord.innerHTML = randomWord;

  // Empty Upcoming Words
  upcomingWords.innerHTML = "";

  // Generate Upcoming Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }

  // Call Start Play Function
  startPlay();
}

// Check if there're scores in local storage
if (localStorage.getItem("scoreGot")) {
  scoreValue = JSON.parse(localStorage.getItem("scoreGot"));
}

// Start Play Function
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;

  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);

      //Compare Words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        // Empty Input Field
        input.value = "";

        // Increase Score
        scoreGot.innerHTML++;

        // Call Generate Words Function
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulations");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          addScoreToLocalStorage();

          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
        // Game Over
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode(
          `Your Score is ${scoreGot.innerHTML}`
        );
        span.appendChild(spanText);
        finishMessage.appendChild(span);

        // Call Store Score Function
        addScoreToLocalStorage(scoreValue);
      }
    }
  }, 1000);
}

// Store Score in local storage
function addScoreToLocalStorage(scoreValue) {
  scoreValue = `Score at ${currentDate} is ( ${scoreGot.innerHTML} )`;
  window.localStorage.setItem("scoreGot", JSON.stringify(scoreValue));
}
