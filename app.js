let row = 12;
let col = 7;

const main = document.getElementById('main');
const remakeGameButton = document.getElementById('remake_game');
let squares;
const results = document.querySelector('#result');
const displayCurrentPlayer = document.querySelector('#current-player');
const player_color = document.querySelector('#player_color');
let currentPlayer = 1;
displayCurrentPlayer.innerHTML = currentPlayer;


drawMap();


function drawMap(){
    let old_grid = document.querySelector('.grid');
    if(old_grid)
        old_grid.parentNode.removeChild(old_grid);

    const grid = document.createElement('div');
    grid.style.width = row * 40 + "px"; // create size based on row & col size
    grid.style.height = col * 40 + "px";
    grid.classList.add('grid');
    main.appendChild(grid);

    // create elements in rows col size

    for (let i = 0; i < col * row; i++) {
        let element = document.createElement('div');
        grid.appendChild(element);
    }

    squares = document.querySelectorAll('.grid div');

    for (let i = 0; i < squares.length; i++) {

        squares[i].onclick = () => {
            for (let j = 0 ; j < col; j++) {

                // let pos = (col * row) - j * row - (col - (i % row));
                let pos = (col * row) - j * row - (row - (i % row));
                // console.log((col * row) - j * row , (i % row) , pos);
                // let pos = i - j * row;
                // console.log(pos);
                if (!squares[pos].classList.contains('taken')) {
        
                    plantPlayer( pos);

                    break

                }
            }
        }

    }

}

function plantPlayer(element_id) {
    
    squares[element_id].classList.add('taken')
    squares[element_id].setAttribute('player_own', currentPlayer)
    squares[element_id].classList.add(currentPlayer == 1 ? 'player-one' : 'player-two')
    
    currentPlayer = currentPlayer == 1 ? 2 : 1; // toggle player
    updatePlayerDispay();
    checkWin(element_id);
}

function checkWin(last_pos_entered) {
    let col_number = Math.floor(last_pos_entered / row);
    let row_number = last_pos_entered % row;
    // console.log(col_number, row_number , "maadad");
    // console.log(col_number * col, col_number * col + col , 1 , "satasrt")
    // console.log(col_number , row_number , "Sadasdasdasd")
    checkLineMatch(col_number * row, col_number * row + row , 1); // check line match in horizental order
    checkLineMatch(row_number, col * row, row); // check line match in vertical order

    checkDiagonalRTL(row_number, col_number);
    checkDiagonalLTR(row_number , col_number);
}


function checkDiagonalRTL(row_number, col_number) {
    let match = false;

    if (row_number >= col_number) {
        start_row_number = row_number - col_number;
        start_col_number = 0;
    } else {
        start_col_number = col_number - row_number;
        start_row_number = 0;
    }   

    // console.log(start_row_number , start_col_number);

    let count_of_match = 0;
    let starting = squares[start_col_number * row + start_row_number].getAttribute('player_own');

    while (true) {

        element = squares[start_col_number * row + start_row_number].getAttribute('player_own');

        if (starting == element && element !== null) {
            ++count_of_match;
        } else {
            starting = element;
            count_of_match = 1;
        }
       
        if (count_of_match >= 4) {
            match = true;
        }

        if (start_col_number < col - 1 && start_row_number < row - 1) {
            start_col_number++;
            start_row_number++;
        } else {
            break;
        }

    }


    if (match) gameOver();
}

function checkDiagonalLTR(row_number, col_number) {
    let match = false;


    if (row_number + col_number <= row - 1) {
        start_row_number = row_number + col_number;
        start_col_number = 0;
    } else {
        start_row_number = row - 1;
        start_col_number = (row_number + col_number) - (row - 1);
    }


    let count_of_match = 0;
    let starting = squares[start_col_number * row + start_row_number].getAttribute('player_own');

    while (true) {

        element = squares[start_col_number * row + start_row_number].getAttribute('player_own');

        if (starting == element && element !== null) {
            ++count_of_match;
        } else {
            starting = element;
            count_of_match = 1;
        }

        if (count_of_match >= 4) {
            match = true;
        }

        if (start_col_number < col - 1 && start_row_number >= 0) {
            start_col_number++;
            start_row_number--;

        } else {
            break;
        }

    }


    if (match) gameOver();

}

function checkLineMatch(start, end, jump) {
    let starting = squares[start].getAttribute('player_own');
    let match = false;
    let count_of_match = 0;
    console.log(squares);
    for (i = start; i < end; i += jump) {
        console.log(i);
        let element = squares[i].getAttribute('player_own');

        if (starting == element && element !== null) {
            ++count_of_match;
        }
        else {
            starting = element;
            count_of_match = 1;
        }

        // console.log(count_of_match);

        if (count_of_match >= 4) {
            match = true;
        }
    }

    if (match) gameOver();
}

function gameOver(){
    alert("Player " + currentPlayer + " Win ! Congrates");
    reset()
}

function reset() {
    // currentPlayer = 1;
    drawMap();
}

function updatePlayerDispay(){
    displayCurrentPlayer.innerHTML = currentPlayer;
    player_color.style.color = currentPlayer == 1 ? 'red' : 'blue';
}

function remakeGame(){
    row = parseInt(document.getElementById('row_size').value);
    col = parseInt(document.getElementById('col_size').value);
    currentPlayer = 1;
    updatePlayerDispay();
    drawMap();
}