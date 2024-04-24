// some important "almost never changed" constants in upper case
let FPS = 30;

// loading Canvas to work with
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");




let update = () => {
    pacman.move();
    pacman.eat();
};

let draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // at first, I thought this "black background"
    // was unecessary in the draw function...
    // them my pacman was rendered nicely, but the old pacman frames
    // were freezed in the screen, I took 3h revising a no-flaws code...
    // this is why we render this background, to clean the
    // old pacman frames.
    // try to comment or remove this and check the code again!
    Rectangle(0, 0, canvas.width, canvas.height, "black");
    renderMap();
    drawFoods();
    pacman.draw();
};


let gameLoop = () => {
    update();
    draw();
};


let gameInterval = setInterval (gameLoop, 1000 / FPS);


let score = 0;
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