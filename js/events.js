let gameOver = () => {
    drawGameOver();
    clearInterval(gameInterval);
    // press start;
};

let gameStart = () => {
    score = 0;
    lives = 3;
    createPacman();
    createGhosts();
    drawGameOver();
};

let restartGame = () => {
    createPacman();
    createGhosts();
    lives--;
    if (lives == 0) { gameOver(); };
};

let zeroFood = () => {
    MAP = newMap();
    // console.log("no Fooooooood");
};
