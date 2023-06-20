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
  // Initialize the game
initGame();

  
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
 
  // Function to handle the user's guess
function handleGuess(event) {      
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
    guessesRemaining--;
    if (guessesRemaining === 0) {
      console.log('Game over! You have run out of guesses.');
    
    }
}  

  // Function to check if the user has won
function checkWin() {
    const wordArray = Array.from(WORD);
  
    if (wordArray.every(letter => correctGuesses.includes(letter))) {
      console.log('Congratulations! You have won the game!');
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

  