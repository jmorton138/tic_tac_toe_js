document.addEventListener('DOMContentLoaded', () => {
    Gameboard.newGame();
    Gameboard.updateGameboard();
    gameLoop();


})

const Gameboard = (() => {

    var spaces = []

    const newGame = () => {
        const displayBoard = document.querySelector('.gameboard');
        displayBoard.innerHTML = '';

        for(let i = 1; i < 10; i++) {
            spaces.push('');
        }
        let j = 1;

        spaces.forEach(space => {
            var element = document.createElement("DIV");
            element.innerHTML = space;
            element.className ="space";
            element.id = j;
            displayBoard.appendChild(element);
    
            j++;
        });
    }

    const updateGameboard = () => {
        console.log(spaces);

    }

    return {newGame, updateGameboard, spaces}
})();


const Player = (num) => {
    var marker = 'X';
    if (num === 2) {
        marker = 'O';      
    }
    const markSpace = (event) => {
        event.target.innerHTML = marker;
    }
    return { num, marker, markSpace }
}

const playerTurn = (number) => {
    const {num} = Player(number);
    const startTurn = () => {
        document.querySelector('.player-turn').innerHTML = `Player ${num}'s turn`;
        var turnOver = false;

        return { turnOver }
    };

    const endTurn = () => { 
        startTurn.turnOver = true;
    }

    return { startTurn, endTurn }
}




function setPlayer(num) {
    const player = Player(num)
    return player;

}

function switchTurns(player, opp) {
    var temp = player;
    player = opp;
    opp = temp;
    return { player, opp } 
}

function validateTurn(event, player) {
    if (event.target.innerHTML === '') {
        player.markSpace(event);
    } else {
        return false
    }
}





// function gameOverCheck() {
//     if () {
//         return true;
//     }
//     return false
// }

// function catsGameCheck() {
//     //if no spaces are ''
//     board = document.querySelector('.gameboard')
//     board.forEach(space => {
//         console.log(space.id)
//     })
// }

function gameLoop() {
    var gameOver = false;
    var player = setPlayer(1);
    var opp = setPlayer(2);

    playerTurn(player.num).startTurn();
    document.querySelectorAll('.space').forEach(space => {
        space.addEventListener('click', event => {
            if (validateTurn(event, player) === false) {
                return
            }
            playerTurn(player.num).endTurn;
            console.log(Gameboard.spaces)
            //switch turns
            var temp = player;
            player = opp;
            opp = temp;
            //check for game over
            if (gameOver === true) {
                console.log('gameover');
                return;
            }
            playerTurn(player.num).startTurn();
            
        })
    });



}
