/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/




var scores, roundScore, activePlayer, dice, dice1, dice2, gamePlaying;
init();

var previousDice;


//operations with .btn-roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // random number
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        // display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';

        if (dice === 6 && previousDice === 6 || dice2 === 6 && previousDice2) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();

        }else if (dice !== 1 && dice2 !==1) {
            //add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //next player
            nextPlayer();
            document.querySelector('#current-' + activePlayer).textContent = 0;
        }
        previousDice = dice;
        previousDice2 = dice2;
    }
    
});


//operations with .btn-hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //1. add current score to global score
        scores[activePlayer] += roundScore;

        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var userscore = document.querySelector('.final-score').value;
        var winningScore;

        // undefined, 0, null or "" are coerced to false

        if(userscore) {
            winningScore = userscore;
        } else {
            winningScore = 100;
        }


        //3. Check if player won the game
        if ( scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //4. Next player
            nextPlayer();
        }
    }
});


function nextPlayer(){
//next player
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
roundScore = 0;

document.querySelector('#current-0').textContent = '0';
document.querySelector('#current-1').textContent = '0';

// add class if inexistent or remove if already there
document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');

// alternate version
// document.querySelector('.player-0-panel').classList.remove('active');
// document.querySelector('.player-1-panel').classList.add('active');

//hide dice again
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //remove active class from both and add to player 1. It's necessary to remove otherwise the element has two "active" classes
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


}


// document.querySelector('#current-' + activePlayer).textContent = dice;
// //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; same result but with HTML injection instead of plain text

// var x = document.querySelector('#score-0').textContent;
// console.log(x);