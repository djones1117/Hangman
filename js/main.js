  /*----- constants -----*/
const WORD = 'SEIROCKS';   // The word that needs to be guessed
const MAX_GUESSES = 7;    //maximum number of guesses allowed.

  /*----- state variables -----*/
let correctGuesses = [];   //array that stores correctly guessed letters
let incorrectGuesses = []; //array that stores incorrectly guessed letters
let guessesRemaining = MAX_GUESSES 
let isGameOver = false;    // Game status flag. Added to stop guesses from registering after game resets

  /*----- cached elements  -----*/
  const wordDisplay = document.getElementById('WordDisplay');
  const keyboard = document.getElementById('Keyboard');
  const messageElement = document.getElementById('message');
  const guessesRemainingElement = document.getElementById('guessesRemaining');
  const playAgainButton = document.getElementById('playAgainButton');
  /*----- event listeners -----*/
  keyboard.addEventListener('click', handleGuess);
  playAgainButton.addEventListener('click', resetGame);
  /*----- functions -----*/
  // Initialize the game
initGame();

  
 // Function to initialize the game
function initGame() {
    correctGuesses = [];
    incorrectGuesses = [];
    guessesRemaining = MAX_GUESSES;
    isGameOver = false;
    displayBlanks();
    updateGuessesRemaining();
    messageElement.textContent = '';
    playAgainButton.classList.add('hidden');
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
 
  // Function to handle the user's guess
function handleGuess(event) {   
    if (isGameOver) {
        return; // Return early if the game is over //added to stop guesses from registering after game ends.
      } 
      // Check if the game is won or lost 
  if (!isGameOver) {
    checkWin();
    checkLoss();
  }
    const letter = event.target.textContent;
  //the function receives an event object as a parameter, representing the click event triggered by the player. 
  //It extracts the letter that was clicked by accessing the textContent property of the clicked element. This assumes that each letter is enclosed within a <div> element in the keyboard section.
  //notes for self when explaining function. 
  //It checks if the extracted letter is either empty or not a valid alphabetic character using the isAlpha function. If it is empty or not a letter, the function returns and does not process the guess further.
    if (!letter || !isAlpha(letter)) {
      return;
    }
  //It checks if the letter has already been guessed correctly or incorrectly by checking if it exists in either the correctGuesses array or the incorrectGuesses array. If it has been guessed before, the function returns and does not process the guess further.
    if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
      return;
    }
  //if the letter is a valid guess and has not been guessed before, it checks if it exists in the WORD string. If it does, it means the guess is correct. The letter is added to the correctGuesses array, and the updateWordDisplay function is called to update the displayed word with the correct guesses. Then, the checkWin function is called to check if the user has won the game.
    if (WORD.includes(letter)) {
      correctGuesses.push(letter);
      updateWordDisplay();
      checkWin();
    } else {           
      incorrectGuesses.push(letter);
      updateGuessesRemaining();
      checkLoss();
    }
  //If the letter is not in the WORD string, it means the guess is incorrect. The letter is added to the incorrectGuesses array, and the updateGuessesRemaining function is called to update the remaining number of guesses. Then, the checkLoss function is called to check if the user has lost the game.
   
  
  event.target.classList.add('disabled');
  }
  //Finally, the clicked element's class is updated by adding the 'disabled' class. This class is used for styling purposes, typically to visually indicate that the letter has been guessed.
  
  // Function to update the remaining guesses
function updateGuessesRemaining() {
    if (incorrectGuesses.length > 0 && !isGameOver) {
    guessesRemaining--;
    }
    guessesRemainingElement.textContent = `Guesses Remaining: ${guessesRemaining}`;
  if (guessesRemaining === 0) {
      displayLossMessage();
    }
}  

// Function to display a win message
function displayWinMessage() {
    isGameOver = true;
    messageElement.textContent = 'Congratulations! You have won the game!';
    playAgainButton.classList.remove('hidden');
  }
  
  // Function to display a loss message
  function displayLossMessage() {
    isGameOver = true;
    messageElement.textContent = 'Game over! You have run out of guesses.';
    playAgainButton.classList.remove('hidden');
  }


  // Function to check if the user has won
function checkWin() {
    const wordArray = Array.from(WORD);
  
    if (wordArray.every(letter => correctGuesses.includes(letter))) {
        displayWinMessage();
    }
  }

  // Function to check if the player has lost
function checkLoss() {
    if (guessesRemaining === 0) {
        displayLossMessage();
    }
  }


  

  // Function to update the word display with correct guesses
function updateWordDisplay() {
    const blanks = wordDisplay.getElementsByClassName('Blank');
  
    for (let i = 0; i < WORD.length; i++) {
      const letter = WORD[i];
  
      if (correctGuesses.includes(letter)) {
        blanks[i].textContent = letter;
      }
    }
  }
  // Function to check if a character is a letter (A-Z or a-z)
function isAlpha(ch) {
    return /^[A-Z]$/i.test(ch);
  }

  //function that resets the game after a winner or loser has been returned.
  function resetGame() {
    correctGuesses = [];
    incorrectGuesses = [];
    guessesRemaining = MAX_GUESSES;
    updateWordDisplay();
    updateGuessesRemaining();
    messageElement.textContent = '';
    playAgainButton.classList.add('hidden');
    keyboard.querySelectorAll('div').forEach((div) => {
      div.classList.remove('disabled');
    });
    initGame();
  }