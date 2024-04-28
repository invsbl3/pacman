const FPS = 30;
const GAME_INTERVAL = 1000 / FPS;
const MAX_PACMAN_TIMEOUT = Math.round(GAME_INTERVAL / PACMAN_TOTAL_FRAMES);

// loading Canvas to work with
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");




let update = () => {
    pacman.move();
    pacman.eat();
    updateGhosts();
    //  console.log("pacman x: ",Math.round(pacman.x/ONE_BLOCK_SIZE),
    // "pacman y: ", Math.round(pacman.y/ONE_BLOCK_SIZE));
};

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // at first, I thought this "black background"
    // was unecessary in the draw function...
    // them my pacman was rendered nicely, but the old pacman frames
    // were freezed in the screen, I took 3h revising a no-flaws code...
    // this is why we render this background, to clean the
    // old pacman frames.
    // try to comment or remove this and check the code again!
    Rectangle(0, 0, canvas.width, canvas.height, "black");
    drawScore();
    drawSuper();
    renderMap();
    drawFoods();
    drawPacman();
    drawGhosts();
};

let gameLoop = () => {
    update();
    draw();
};




let score = 0;
let pacman;
createPacman();

let ghosts = [];
createGhosts();
let gameInterval = setInterval(gameLoop, GAME_INTERVAL);
gameLoop();