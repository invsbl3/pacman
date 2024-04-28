const FRAME_LIVES_MENU = 1;

const SCORE_LINE = ONE_BLOCK_SIZE * (MAP.length + 2);
const LINE_VERTICAL_SPACE = ONE_BLOCK_SIZE * 2;
const LINE_SIZE = ONE_BLOCK_SIZE * 1;

const HALF_VERTICAL = MAP[1].length * ONE_BLOCK_SIZE / 2;
const HALF_HORIZONTAL = MAP.length * ONE_BLOCK_SIZE / 2;

let drawLives = () => {
    chooseFont(LINE_SIZE);
    ctx.fillText("LIVES: ", 0, SCORE_LINE);

    for (let i = 0; i < lives; i++) {
        ctx.drawImage(
            pacmanFrames,
            (FRAME_LIVES_MENU + i) * ONE_BLOCK_SIZE,
            0,
            ONE_BLOCK_SIZE,
            ONE_BLOCK_SIZE,
            HALF_VERTICAL - (LINE_SIZE + 1) * (4 - i),
            SCORE_LINE - ONE_BLOCK_SIZE,
            LINE_SIZE,
            LINE_SIZE
        );
    };
};


let drawScore = () => {
    chooseFont(LINE_SIZE);

    ctx.fillText("SCORE: " + score, HALF_VERTICAL, SCORE_LINE);
};

let drawSuper = () => {
    if (pacman.superModeOn) {
        chooseFont(LINE_SIZE);
        ctx.fillText("SUPER MODE ON! ", 0, SCORE_LINE + ONE_BLOCK_SIZE);
    };
};

let drawGameOver = () => {
    ctx.font = 1.5 * LINE_SIZE + "px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText(
        "GAME OVER!",
        HALF_VERTICAL * 0.25,
        HALF_HORIZONTAL
    );
};

let drawWinner = () => {
    ctx.font = 1.5 * LINE_SIZE + "px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.fillText(
        "! WINNER !",
        HALF_VERTICAL * 0.25,
        HALF_HORIZONTAL
    );
};

let chooseFont = (size) => {
    ctx.font = size + "px 'Press Start 2P'";
    ctx.fillStyle = "white";
};