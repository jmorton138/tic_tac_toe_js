document.addEventListener('DOMContentLoaded', () => {
    const displayBoard = document.querySelector('.gameboard');
    Gameboard.spaces.forEach(space => {
        var element = document.createElement("DIV");
        element.innerHTML = space;
        displayBoard.appendChild(element);
    })
})

const Gameboard = (() => {
    var spaces = []
    for(let i = 1; i < 10; i++) {
        spaces.push(i);
    }
    return { spaces }
})();

