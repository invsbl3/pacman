const ghostFrames = document.getElementById("ghosts");
const GHOST_SPEED = PACMAN_SPEED / 2;
const GHOST_RANGE = ONE_BLOCK_SIZE * 5;
const GHOST_SIZE = ONE_BLOCK_SIZE * 0.95;
const MAX_GHOSTS = 4;
const GHOST_HOUSE_X = 9;
const GHOST_HOUSE_Y = 10;

/*const GHOST_START = [
    [GHOST_HOUSE_X    ,GHOST_HOUSE_Y    ],
    [GHOST_HOUSE_X    ,GHOST_HOUSE_Y + 1],
    [GHOST_HOUSE_X + 2,GHOST_HOUSE_Y    ],
    [GHOST_HOUSE_X + 2,GHOST_HOUSE_Y + 1]
];*/



const GHOST_START = [[ 1, 1],[5,10],[11,10],[20,15]];
const GHOSTS_POSITIONS = [
    [ [  0,   0], [176,   0] ],
    [ [  0, 121], [176, 121] ]
];
const GHOST_NAMES = ["Vermelhaldo", "Chiclete", "Asmarelo", "Carlos"];
const COLORS = ["white", "green", "blue", "red"];
const GHOST_WIDTH = 124;
const GHOST_HEIGHT = 116;
const RANDOM_TARGETS = [
    { x: 1 * ONE_BLOCK_SIZE, y: 1 * ONE_BLOCK_SIZE },
    { x: 1 * ONE_BLOCK_SIZE, y: (MAP.length - 2) * ONE_BLOCK_SIZE },
    { x: (MAP[0].length - 2) * ONE_BLOCK_SIZE, y: ONE_BLOCK_SIZE },
    {
        x: (MAP[0].length - 2) * ONE_BLOCK_SIZE,
        y: (MAP.length - 2) * ONE_BLOCK_SIZE,
    },
];

class Ghost {
    constructor ( x, y, width, height, speed,
        imgX, imgY, imgWidth, imgHeight, range, name, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_DOWN;
        this.nextDirection = DIRECTION_RIGHT;
        // take the "right ghost from the file"
        this.imgX = imgX;
        this.imgY = imgY;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.range = range;
        this.target = pacman;
        this.name = name;
        this.color = color;
        this.path = [[]];
        this.gx = Math.round(this.x / ONE_BLOCK_SIZE);
        this.gy = Math.round(this.y / ONE_BLOCK_SIZE);

    };

    move() {
        this.chooseFollowTarget();
    };

    pacmanNear() {
        let pacmanNear = false;
        let xdis = this.x - pacman.x;
        let ydis = this.y - pacman.y;
        let dispacman = Math.sqrt(xdis**2 + ydis**2);
        if (dispacman < this.range) {
            pacmanNear = true;
        };
        return pacmanNear;
    };

    chooseFollowTarget(){
        let lastTarget = this.target;
        if (this.pacmanNear()){
            this.target = pacman;
            this.findPath();
        };
        if (!this.pacmanNear()){
            if(lastTarget == pacman){
                let randomIndex = Math.floor(Math.random()*RANDOM_TARGETS.length);
                this.target = RANDOM_TARGETS[randomIndex];
                this.findPath();
            };
        };
    };

    findPath () {
        let gx = Math.round(this.x / ONE_BLOCK_SIZE);
        let gy = Math.round(this.y / ONE_BLOCK_SIZE);
        let tx = Math.round(this.target.x / ONE_BLOCK_SIZE);
        let ty = Math.round(this.target.y / ONE_BLOCK_SIZE);
        this.path = findPath(tx, ty, gx, gy);
    };
    
    back() {
       // remember that the canvas have
        // origin on top left, and the horizontal x
        // grows to the left
        // and the vertical y grows going down!
        switch(this.direction){
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                break;
        }
    };

    forward() {
        // remember that the canvas have
        // origin on top left, and the horizontal x
        // grows to the left
        // and the vertical y grows going down!
        switch(this.direction){
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_DOWN:
                this.y += this.speed;
                break;
        }
    };

    wallHit() {
        let collided = false;
        // if touches a wall in any side, collided?
        if(
            MAP[this.upperY()][this.leftX()] == 1 ||
            MAP[this.downY()][this.leftX()] == 1 ||
            MAP[this.upperY()][this.rightX()] == 1 ||
            MAP[this.downY()][this.rightX()] == 1
        ) {
            collided =  true;
        }
        return collided;
    };

    upperY() {
        // takes the upper point height of the char
        // returns the equivalent integer [i] in the map
        return parseInt(this.y / ONE_BLOCK_SIZE);
    };
    downY() {
        // takes a "close to the bottom border" point of the char
        // returns the equivalent integer [i] in the map
        return parseInt( (this.y + 0.99 * ONE_BLOCK_SIZE) / ONE_BLOCK_SIZE );
    };
    leftX() {
        // takes the left point height of the char
        // returns the equivalent integer [j] in the map
        return parseInt(this.x / ONE_BLOCK_SIZE);
    };
    rightX() {
        // takes a "close to the right border" point of the char
        // returns the equivalent integer [j] in the map
        return parseInt( (this.x + 0.99 * ONE_BLOCK_SIZE) / ONE_BLOCK_SIZE );
    };
    draw() {
        ctx.save();
        ctx.translate(
            this.x + ONE_BLOCK_SIZE / 2,
            this.y + ONE_BLOCK_SIZE / 2
        );
        ctx.translate(
            -this.x - ONE_BLOCK_SIZE / 2,
            -this.y - ONE_BLOCK_SIZE / 2
        );
        ctx.drawImage(
            ghostFrames,
            this.imgX, this.imgY,
            this.imgWidth, this.imgHeight,
            this.x, this.y,
            GHOST_SIZE, GHOST_SIZE
        );
        ctx.restore();
    };


    drawRange() {
        ctx.beginPath();
        ctx.arc(
            (Math.round( this.x / ONE_BLOCK_SIZE) + 0.5)*ONE_BLOCK_SIZE,
            (Math.round( this.y / ONE_BLOCK_SIZE) + 0.5)*ONE_BLOCK_SIZE,
            this.range,
            0,
            (Math.PI / 180) * 360
        );
        ctx.stroke();
    };
};


let createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < GHOSTS_POSITIONS.length; i++){
        // for(let j = 0;j<1;j++)
       for (let j = 0; j < GHOSTS_POSITIONS[i].length; j++)
        {
            let newGhost = new Ghost(
                GHOST_START[i+2*j][0] * ONE_BLOCK_SIZE,
                GHOST_START[i+2*j][1] * ONE_BLOCK_SIZE,
                ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
                GHOST_SPEED,
                GHOSTS_POSITIONS[i][j][0], GHOSTS_POSITIONS[i][j][1],
                GHOST_WIDTH, GHOST_HEIGHT,
                GHOST_RANGE,
                GHOST_NAMES[i+2*j],
                COLORS[i+2*j]
            );    
            ghosts.push(newGhost);
            console.log(newGhost);
        };
    };
};

let drawGhosts = () => {
    for ( let i = 0; i < ghosts.length; i++){
        ghosts[i].draw();
        ghosts[i].drawRange();
        renderPath(ghosts[i].path, ghosts[i].color);

    }
}

let updateGhosts = () => {
    for(let i = 0; i < ghosts.length; i++) {
        ghosts[i].move();
    }
}



