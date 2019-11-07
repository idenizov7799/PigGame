/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();


document.querySelector(".btn-roll").addEventListener('click', function(){
    if(gamePlaying)
    {
        var diceDOM = document.querySelector(".dice");
        var diceDOM2 = document.querySelector(".dice2");
        diceDOM.style.display = 'block';
        diceDOM.src = 'animatedDice.gif';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'animatedDice2.gif';

        setTimeout(function(){
            // 1. Random number
            var dice = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;
            // 2. Display result    
            diceDOM.src = 'dice-' + dice + '.png';  
            diceDOM2.src =  'dice-' + dice2 + '.png';  

            if(dice === 1 && dice2 === 1){                
                scores[activePlayer] = 0;    
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
                oops();
            }

            // 3. Update the round score IF the rolled number was NOT a 1
            if(dice !== 1 && dice2 !==1){
                roundScore += dice + dice2;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }else{
                oops();
            }
        }, 1500);
        
        
     
    }
});

function oops(){
    document.getElementById("oops").style.display = 'block';
    setTimeout(function(){
        document.getElementById("oops").style.display = 'none';
        nextPlayer();
    }, 1500); 
}


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying)
    {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;    
        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if(scores[activePlayer] >= 100)
        {
            document.getElementById('name-'+activePlayer).textContent = "WINNER!!!";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(".dice2").style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else
        {
            // Next Player
            nextPlayer();  
            
        }
    }

});

function nextPlayer(){
        //next player        
        activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector(".dice").style.display = 'none'; 
        document.querySelector(".dice2").style.display = 'none';   
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;    

    document.querySelector(".dice").style.display = 'none';
    document.querySelector(".dice2").style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById("oops").style.display = 'none'; 
}