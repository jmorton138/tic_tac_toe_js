document.addEventListener('DOMContentLoaded', () => {
    const displayBoard = document.querySelector('.gameboard');
    Gameboard.spaces.forEach(space => {
        var element = document.createElement("DIV");
        element.innerHTML = space;
        element.className ="space";
        displayBoard.appendChild(element);
    });
    gameLoop();


})

const Gameboard = (() => {
    var spaces = []
    for(let i = 1; i < 10; i++) {
        spaces.push(i);
    }
    return { spaces }
})();

const Player = (num) => {
    const marker = 'X';
    if (num === 2) {
        const marker = 'O';      
    }
    //
    
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
        console.log(startTurn.turnOver) 
    }

    return { startTurn, endTurn }
}

// document.querySelectorAll('.space').forEach(space => {
//     space.addEventListener('click', event => {
//         player.markSpace(event);
//         turnOver = true;  
//     })
// });


function setPlayer(num) {
    const player = Player(num)
    return player;

}

function gameLoop() {
    var gameOver = false;
    const p1 = setPlayer(1);
    const p2 = setPlayer(2);
    currentPlayer = p1;

    document.querySelectorAll('.space').forEach(space => {
        space.addEventListener('click', event => {
            currentPlayer.markSpace(event);
            playerTurn(currentPlayer.num).endTurn();
        })
    });
    playerTurn(1).startTurn()

    // do {
        

    // } while (gameOver === false);
}
