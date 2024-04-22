// some important "almost never changed" constants in upper case
let FPS = 30;

// loading Canvas to work with
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// loading files from index.html to work with
const ghostFrames = document.getElementById("ghosts");

let createPacman = () => {
    pacman = new Pacman(
        ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
        ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
        PACMAN_SPEED
    )
};

let gameLoop = () => {
    update();
    draw();
};

let update = () => {
    pacman.move();
};

let draw = () => {
    //render black background:
    // Rectangle( 0, 0, canvas.width, canvas.height, "black");
    // We are rendering the black color with CSS in the HTML
    // <body style = "background-color: black"></body>
    renderMap();
    drawFoods();
    pacman.draw();
};





let gameInterval = setInterval (gameLoop, 1000 / FPS);

let pacman;
createPacman();
gameLoop();


window.addEventListener("keydown", (event) => {
    let k = event.keyCode;

    setTimeout( () => {
        if ( k == 37 || k == 65 ) { pacman.nextDirection = DIRECTION_LEFT;}
        else if ( k == 38 || k == 87 ) {pacman.nextDirection = DIRECTION_UP;}
        else if ( k == 39 || k == 68 ) {pacman.nextDirection = DIRECTION_RIGHT;}
        else if ( k == 40 || k == 83 ) {pacman.nextDirection = DIRECTION_DOWN;}
    })
})