const DIRECTION_RIGHT = 4;
const DIRECTION_LEFT = 2;
const DIRECTION_UP = 3;
const DIRECTION_DOWN = 1;

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;

    setTimeout( () => {
        if ( k == 37 || k == 65 ) { pacman.nextDirection = DIRECTION_LEFT;}
        else if ( k == 38 || k == 87 ) {pacman.nextDirection = DIRECTION_UP;}
        else if ( k == 39 || k == 68 ) {pacman.nextDirection = DIRECTION_RIGHT;}
        else if ( k == 40 || k == 83 ) {pacman.nextDirection = DIRECTION_DOWN;}
    })
});