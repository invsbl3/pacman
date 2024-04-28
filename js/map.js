
// BUILDING THE MAP
// the space is divided in blocks, each one rendered between screen frames.
const WALL = -50; // Wall Block
const FOOD = 2; // Path with Food
const PATH = 3; // Path without Food
const SUPR = 4; // Super Food (the one to eat ghosts o.o)

// some important "almost never changed" constants in upper case

let MAP = newMap();
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

function getCanvasDim() {
    let width = canvas.width;
    let height = canvas.height;
    return [width, height]; 
};

//const canvasWidth = getCanvasDim()[0] ;
//const ONE_BLOCK_SIZE = Math.floor(canvasWidth/ MAP.length);  
const ONE_BLOCK_SIZE = 20;
const WALL_COLOR = "#342DCA"; // hex code of some blue
const WALL_SPACE = ONE_BLOCK_SIZE / 1.4;
const WALL_OFFSET = (ONE_BLOCK_SIZE - WALL_SPACE) / 2;
const WALL_INNER_COLOR = "black";




function newMap(){
    const START_MAP = [
        [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
        [WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL],
        [WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL],
        [WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL],
        [WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL],
        [WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL],
        [WALL, SUPR, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, SUPR, WALL],
        [WALL, WALL, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, WALL, WALL],
        [PATH, PATH, PATH, PATH, WALL, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, WALL, PATH, PATH, PATH, PATH],
        [WALL, WALL, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, FOOD, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, WALL, WALL],
        [WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL],
        [WALL, WALL, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, FOOD, FOOD, FOOD, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, WALL, WALL],
        [PATH, PATH, PATH, PATH, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, PATH, PATH, PATH, PATH],
        [PATH, PATH, PATH, PATH, WALL, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, WALL, PATH, PATH, PATH, PATH],
        [WALL, WALL, WALL, WALL, WALL, FOOD, FOOD, FOOD, WALL, WALL, WALL, WALL, WALL, FOOD, FOOD, FOOD, WALL, WALL, WALL, WALL, WALL],
        [WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL],
        [WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL, WALL, WALL, FOOD, WALL],
        [WALL, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, WALL],
        [WALL, WALL, FOOD, FOOD, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, FOOD, FOOD, WALL, WALL],
        [WALL, FOOD, FOOD, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, WALL, FOOD, FOOD, FOOD, FOOD, FOOD, WALL],
        [WALL, FOOD, WALL, WALL, WALL, WALL, WALL, WALL, WALL, FOOD, WALL, FOOD, WALL, WALL, WALL, WALL, WALL, WALL, WALL, FOOD, WALL],
        [WALL, SUPR, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, FOOD, SUPR, WALL],
        [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ];
    return START_MAP;
};


let Rectangle = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};



// here, we render in blue the walls
// and then pass one by one to "unpaint" unnecessary borders
// rendering a lot of times a black rectangle in the middle
// some other ways to render:

// 1- wall in blue and right after center in black
// then add the offsets when needed (almost same computational time)

// 2- check when the condition is NOT reached and paint?
// I think there's a quickier/less consuming way to render but couldn't figure
// out right now...


let renderMap = () => {
    for (let i = 0; i < MAP.length; i++){
        // here we are looking one row after another...
        for (let j = 0; j < MAP[i].length; j++){
            // here we are looking for a element in a choosen row
            // here we are in an element j of a row i of our map.
            // we need to check if it is a wall or a path
            // so we render a wall or a path
            if (MAP[i][j] == WALL){
                //it's a wall, render!
                Rectangle(
                    j * ONE_BLOCK_SIZE, i * ONE_BLOCK_SIZE, //initial position
                    ONE_BLOCK_SIZE, ONE_BLOCK_SIZE, //dimensions
                    WALL_COLOR //color
                );

                // we want just the border of the walls
                // we are going to "undraw" undesired borders
                // check auxiliar image "references/border.png"
                // to understand (i had some trouble)
                if ( j > 0 && MAP[i][j- 1] == WALL) {
                    // 1- if this block is not in left corner
                    // and is a wall, and the left-one
                    // is a wall too, paint in black:
                    // the middle and the left-border
                    Rectangle(
                        j * ONE_BLOCK_SIZE,
                        i * ONE_BLOCK_SIZE + WALL_OFFSET,
                        WALL_SPACE + WALL_OFFSET,
                        WALL_SPACE,
                        WALL_INNER_COLOR
                    )
                }
                if ( j < MAP[i].length - 1 && MAP[i][j + 1] == WALL) {
                    // 2- if this block is not in the right corner,
                    // and is a wall, and the left-one
                    // is a wall too, paint in black:
                    // the middle and the right-border
                    Rectangle(
                        j * ONE_BLOCK_SIZE + WALL_OFFSET,
                        i * ONE_BLOCK_SIZE + WALL_OFFSET,
                        WALL_SPACE + WALL_OFFSET,
                        WALL_SPACE,
                        WALL_INNER_COLOR
                    )
                }
                if ( i > 0 && MAP[i - 1][j] == WALL) {
                    // 3- if this block is a wall, and the top-one
                    // is a wall too, paint in black:
                    // the middle and the top-border
                    Rectangle(
                        j * ONE_BLOCK_SIZE + WALL_OFFSET,
                        i * ONE_BLOCK_SIZE,
                        WALL_SPACE,
                        WALL_SPACE + WALL_OFFSET,
                        WALL_INNER_COLOR
                    )
                }
               if ( i < MAP.length - 1 && MAP[i + 1][j] == WALL) {
                    // 4- if this block is a wall, and the bottom-one
                    // is a wall too, paint in black:
                    // the middle and the bottom-border
                    Rectangle(
                        j * ONE_BLOCK_SIZE + WALL_OFFSET,
                        i * ONE_BLOCK_SIZE + WALL_OFFSET,
                        WALL_SPACE,
                        WALL_SPACE + WALL_OFFSET,
                        WALL_INNER_COLOR
                    )
                }

            }
            // when using "if -> else if", remember:
            // no ";" in between them:
            // if(){blablalb} "no ; here" else if () {};
            else if (MAP[i][j] != WALL){
                // it's a path, render?
                // actually, the path is just "nothing" on the canvas .-.
            };
        };
    };
};