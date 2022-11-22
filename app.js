const main = document.getElementById('main');
const grid = document.createElement('div');
grid.classList.add('grid');
main.appendChild(grid);

const col = 7;
const row = 7;

for (let i = 0; i < 49; i++) {
    let element = document.createElement('div');
    grid.appendChild(element);
}

const squares = document.querySelectorAll('.grid div');
const results = document.querySelector('#result');
const displayCurrentPlayer = document.querySelector('#current-player');
let currentPlayer = 1;


for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
        for (let j = 0; j < col; j++) {

            let pos = (col * row) - j * col - (col - (i % 7));
            // console.log(pos);
            if (!squares[pos].classList.contains('taken')) {
                plantPlayer(currentPlayer, pos);
                currentPlayer = currentPlayer == 1 ? 2 : 1;

                break

            }
        }
    }
}

function plantPlayer(player_id, element_id) {
    squares[element_id].classList.add('taken')
    squares[element_id].setAttribute('player_own', player_id)
    squares[element_id].classList.add(player_id == 1 ? 'player-one' : 'player-two')
    displayCurrentPlayer.innerHTML = player_id;
    checkWin(element_id);
}

function checkWin(last_pos_entered) {
    let col_number = Math.floor(last_pos_entered / col);
    let row_number = last_pos_entered % row;

    checkLineMatch(col_number * col, col_number * col + col, 1);
    checkLineMatch(row_number, col * row, col);
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

    let count_of_match = 0;
    let starting = squares[start_col_number * col + start_row_number].getAttribute('player_own');

    while (true) {

        element = squares[start_col_number * col + start_row_number].getAttribute('player_own');

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


    if (match) {
        alert("Player " + currentPlayer + " Win ! Congrates");
        reset()
    }
}

function checkDiagonalLTR(row_number, col_number) {
    let match = false;


    if (row_number + col_number <= row - 1) {
        start_row_number = row_number + col_number;
        start_col_number = 0;
    } else {
        // console.log((row_number + col_number) - (col - 1));
        start_row_number = col - 1;
        start_col_number = (row_number + col_number) - (col - 1);
    }

    let count_of_match = 0;
    let starting = squares[start_col_number * col + start_row_number].getAttribute('player_own');

    while (true) {

        element = squares[start_col_number * col + start_row_number].getAttribute('player_own');

        if (starting == element && element !== null) {
            ++count_of_match;
        } else {
            starting = element;
            count_of_match = 1;
        }

        // console.log(count_of_match);
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


    if (match) {
        alert("Player " + currentPlayer + " Win ! Congrates");
        reset()
    }
}

function checkLineMatch(start, end, jump) {
    let starting = squares[start].getAttribute('player_own');
    let match = false;
    let count_of_match = 0;

    for (i = start; i < end; i += jump) {
        let element = squares[i].getAttribute('player_own');

        if (starting == element && element !== null) {
            ++count_of_match;
        }
        else {
            starting = element;
            count_of_match = 1;
        }

        if (count_of_match >= 4) {
            match = true;
        }
    }

    if (match) {
        alert("Player " + currentPlayer + " Win ! Congrates");
        reset()
    }
}

function reset() {
    // currentPlayer = 1;
    window.location.reload()
}

