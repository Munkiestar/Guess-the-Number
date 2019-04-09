/*
GAME FUNCTIONALITY
- player must guess a numer between a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if loose
- let player choose to play again
*/

let min = 1,
	max = 10,
	winNum = getRandomNum(min, max),
	guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}
});


// listen for guess
guessBtn.addEventListener('click', function(){
	let guess = parseInt(guessInput.value);

	// validate
	if(isNaN(guess) || guess < min || guess > max){
		setMessage(`Please senter a number between ${min} and ${max}!`, 'red');
	}

	// check if won
	if(guess === winNum){
		// game over - won

		gameOver(true, `${winNum} is correct, YOU WIN!`);
		
	} else{ 
		// wrong number
		guessesLeft --;

		if(guessesLeft === 0){
			// game over - lost

			gameOver(false, `Game Over, you lost. The correct number was ${winNum}.`);

		} else{
			// game continues - answer wrong

			// change border color
			guessInput.style.borderColor = 'red';

			// clear input
			guessInput.value = '';

			// tell user it's the wrong number
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');

		}
	}
});

// Game over
function gameOver(won, msg){
	let color;
	won === true ? color = 'green' : color = 'red';

	// disable input
	guessInput.disabled = true;
	// change border color
	guessInput.style.borderColor = color;
	// set text color
	message.style.color = color;
	// set message
	setMessage(msg);

	// play again?
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max){
	return Math.floor(Math.random() * (max-min + 1) + min);
}


// set message func
function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;
}
