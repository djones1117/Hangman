  /*----- constants -----*/
const WORD = 'SEIROCKS';   // The word that needs to be guessed
const MAX_GUESSES = 7;    //maximum number of guesses allowed.

  /*----- state variables -----*/
let correctGuesses = [];   //array that stores correctly guessed letters
let incorrectGuesses = []; //array that stores incorrectly guessed letters
let guessesRemaining = MAX_GUESSES 

  /*----- cached elements  -----*/
  const wordDisplay = document.getElementById('WordDisplay');
  const keyboard = document.getElementById('Keyboard');
  /*----- event listeners -----*/


  /*----- functions -----*/
  
// Function to initialize the game
function initGame() {
    displayBlanks();
    keyboard.addEventListener('click', handleGuess);
  }
  
  // Function to display the blanks for the word
function displayBlanks() {
    wordDisplay.innerHTML = '';
  
    for (const letter of WORD) {
      const div = document.createElement('div');
      div.classList.add('Blank');
      wordDisplay.appendChild(div);
    }
  }
