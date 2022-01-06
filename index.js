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

    const updateGameboard = (marker, id) => {
        spaces[id - 1] = marker;
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


const gameOver = (() => {

    function check(marker) {
        if (horizontalGameOver(marker) === true) {
            return true;
        } else if (verticalGameOver(marker) == true) {
            return true;
        } else if (diagonalDownGameOver(marker) == true) {
            return true;

        } else {
            return false

        }
    }

    const horizontalGameOver = marker => {
        let i = 0;
        let j = 1;
        Gameboard.spaces.forEach(space => {
            if (space === marker) {
                i++;
                if (i === 3 && j % 3 === 0) {
                    console.log('horiz win')
                    return true;
                }
            } else {
                i = 0;
            }
            j++;
        });

    }

    const verticalGameOver = marker => {
        let counter = 0
        const array = Gameboard.spaces
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i; j < array.length - 1; j += 3) {
                if (array[j] == marker && array[j+3] == marker) {
                    counter ++;
                    
                    if (counter === 2) {
                        console.log('vert')
                        return true;
                    }
                } else {
                    counter = 0;
                    break
                }
            }
        }
        

    }

    const diagonalDownGameOver = marker => {
        let counter = 0
        const array = Gameboard.spaces
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i; j < array.length - 1; j += 4) {
                if (array[j] == marker && array[j+4] == marker) {
                    counter ++;
                    
                    if (counter === 2) {
                        console.log('diag down')
                        return true;
                    }
                } else {
                    counter = 0;
                    break
                }
            }
        }    

    }

    function catsGameCheck() {
        //if no spaces are '' it's a cat's game
        let i = 0;
        Gameboard.spaces.forEach(space => {
            if (space === '') {
                i++;
            }
        });
        if (i === 0) {
            console.log('catsgame');
        }
    }
    return {check}
})();








function gameLoop() {
    var player = setPlayer(1);
    var opp = setPlayer(2);

    playerTurn(player.num).startTurn();
    document.querySelectorAll('.space').forEach(space => {
        space.addEventListener('click', event => {
            if (validateTurn(event, player) === false) {
                return
            }
            Gameboard.updateGameboard(player.marker, event.target.id)
            playerTurn(player.num).endTurn;
            gameOver.check(player.marker)
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
