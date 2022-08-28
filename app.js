const obstacles = document.querySelectorAll(".obstacle");
const playerText = document.getElementById("player");
const errorText = document.getElementById("error");
let player = "X";
let gameOver = false;
let winner;


function startGame() {
    playerText.textContent = `Sıra ${player}'de !`

    obstacles.forEach(obstacle => obstacle.addEventListener("click", () => chooseArea(obstacle)))
}

function chooseArea(obstacle) {
    if (obstacle.textContent === "") {
        obstacle.textContent = player;
        if (player === "O") {
            obstacle.style.color = "red"
        }
        turnPlayer();
    } else {
        errorText.textContent = "Heyy, it's not empty "
        obstacle.style.border = "2px solid red"
        setTimeout(() => {
            errorText.textContent = ""
            obstacle.style.border = "1px solid black"
        }, 2500)
    }

    checkWin();
    checkTie();

    if (gameOver) {
        playerText.textContent = `Tebrikler Fındığı kazandın! ${winner} `;
        obstacles.forEach(obstacle => obstacle.style.pointerEvents = 'none');
    }
}

function turnPlayer() {
    if (player === "X") {
        player = "Y";
        playerText.textContent = `Sıra ${player}'de !`
        return;
    } else if (player === "Y") {
        player = "X";
        playerText.textContent = `Sıra ${player}'de !`

    }
}

function checkWin() {
    // win
    checkRows()
    checkColumns()
    checkDiagonals()
}

function checkTie() {
    // tie
    const values = [];
    obstacles.forEach(obstacle => values.push(obstacle.textContent))
    if (!values.includes("")) {
        playerText.textContent = "PAT !";
        obstacles.forEach(obstacle => obstacle.style.pointerEvents = 'none');
    }
}

function checkRows() {
    // check rows
    let row1 = obstacles[0].textContent == obstacles[1].textContent &&
        obstacles[0].textContent == obstacles[2].textContent && obstacles[0].textContent !== ""
    let row2 = obstacles[3].textContent == obstacles[4].textContent &&
        obstacles[3].textContent == obstacles[5].textContent && obstacles[3].textContent !== ""
    let row3 = obstacles[6].textContent == obstacles[7].textContent &&
        obstacles[6].textContent == obstacles[8].textContent && obstacles[6].textContent !== ""

    if (row1 || row2 || row3) {
        gameOver = true
    }
    if (row1) return winner = obstacles[0].textContent
    if (row2) return winner = obstacles[3].textContent
    if (row3) return winner = obstacles[6].textContent
}

function checkColumns() {
    // check cols
    let col1 = obstacles[0].textContent == obstacles[3].textContent &&
        obstacles[0].textContent == obstacles[6].textContent && obstacles[0].textContent !== ""
    let col2 = obstacles[1].textContent == obstacles[4].textContent &&
        obstacles[1].textContent == obstacles[7].textContent && obstacles[1].textContent !== ""
    let col3 = obstacles[2].textContent == obstacles[5].textContent &&
        obstacles[2].textContent == obstacles[8].textContent && obstacles[2].textContent !== ""

    if (col1 || col2 || col3) {
        gameOver = true
    }
    if (col1) return winner = obstacles[0].textContent
    if (col2) return winner = obstacles[1].textContent
    if (col3) return winner = obstacles[2].textContent
}

function checkDiagonals() {
    // view
    let view1 = obstacles[0].textContent == obstacles[4].textContent &&
        obstacles[0].textContent == obstacles[8].textContent && obstacles[0].textContent !== ""
    let view2 = obstacles[2].textContent == obstacles[4].textContent &&
        obstacles[2].textContent == obstacles[6].textContent && obstacles[2].textContent !== ""

    if (view1 || view2) {
        gameOver = true
    }
    if (view1) return winner = obstacles[0].textContent
    if (view2) return winner = obstacles[2].textContent
}

startGame();