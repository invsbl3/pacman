const DIRECTION_RIGHT = 4;
const DIRECTION_LEFT = 2;
const DIRECTION_UP = 3;
const DIRECTION_DOWN = 1;

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;

    setTimeout( () => {
        if ( k == 37 ) { pacman.nextDirection = DIRECTION_LEFT;}
        else if ( k == 38 ) {pacman.nextDirection = DIRECTION_UP;}
        else if ( k == 39  ) {pacman.nextDirection = DIRECTION_RIGHT;}
        else if ( k == 40  ) {pacman.nextDirection = DIRECTION_DOWN;}
    })
});



window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    let a = 2;
    setTimeout( () => {
        if ( k == 65 ) { ghosts[a].nextDirection = DIRECTION_LEFT;}
        else if ( k == 87 ) {ghosts[a].nextDirection = DIRECTION_UP;}
        else if ( k == 68 ) {ghosts[a].nextDirection = DIRECTION_RIGHT;}
        else if ( k == 83 ) {ghosts[a].nextDirection = DIRECTION_DOWN;}
    });
});
