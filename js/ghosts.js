const ghostFrames = document.getElementById("ghosts");
const PACMAN_SPEED = ONE_BLOCK_SIZE / 5;
const GHOST_SPEED = PACMAN_SPEED / 2;
const GHOST_RANGE = ONE_BLOCK_SIZE * 5;
const GHOST_SIZE = ONE_BLOCK_SIZE * 0.95;
const MAX_GHOSTS = 4;
const GHOST_HOUSE_X = 9;
const GHOST_HOUSE_Y = 10;
const GHOSTS_POSITIONS = [
    [[0, 0],[176, 0]],
    [[0, 121],[176, 121]]
];
const GHOST_NAMES = ["Vermelhaldo", "Chiclete", "Asmarelo", "Carlos"];
const GHOST_WIDTH = 124;
const GHOST_HEIGHT = 116;

class Ghost {
    constructor ( x, y, width, height, speed,
        imgX, imgY, imgWidth, imgHeight, range, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = DIRECTION_RIGHT;
        // take the "right ghost from the file"
        this.imgX = imgX;
        this.imgY = imgY;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.range = range;
        this.target = pacman;
        this.name = name
    };

    pacmanNear() {
        let xdis = this.x - pacman.x;
        let ydis = this.y - pacman.y;
        let dispacman = Math.sqrt(xdis**2 + ydis**2);
        if (dispacman < this.range) {
            this.target = pacman;
            console.log ("pacman is near the ghost " + this.name + " !");
        };
    };

    followtarget(map, xdis, ydis) {
        //find a ~good~ path to reach the target
        // the target can change, so check the target
        // if same target as before, just keep going
        // if changed targed, re-calculate route
    }

    distanceMap() {
        MAP.length = rows;
        MAP[0].length = columns;
        let visited = Array(rows).fill().map(() => Array(columns).fill(false));
        let distance = Array(rows).fill().map(() => Array(columns).fill(0));
        

        const source = [this.y, this.x];

        let toCheck = [source];
        let newtoCheck = [];

        checkMap = () => {
            for (i = 1; i < toCheck.length; i++) {
                row = toCheck[i][0];
                col = toCheck[i][1];
                dist = distance[row][col];
                checkNeigbours(row, col, dist);
                endCondition();
                toCheck = newtoCheck;
            };
        };

        endCondition = () => {
            for (let i = 0; i < rows; i++){
                for (let j = 0; j < columns; j++){
                    if (visited[i][j] == false){
                        break;
                    };
                    return distance;
                };
            }
        };
        checkNeigbours = ( x, y, dist) => {
            checkPoint( x  , y+1, dist);
            checkPoint( x+1, y  , dist);
            checkPoint( x  , y-1, dist);
            checkPoint( x-1, y  , dist);
        };
        checkPoint = (x, y, dist) => {
        if ( x >= 0 && x < rows
            && y >= 0 && y < columns
            && visited[x][y] == false) {
                visited[x][y] = true;
                if ( MAP[x][y] != WALL ) {
                    distance[x][y] = dist + 1;
                    newtoCheck.push([x, y]);
                };
            };
        };
    };


    chasePacman () {
        let gx = Math.round(this.x / ONE_BLOCK_SIZE);
        let gy = Math.round(this.y / ONE_BLOCK_SIZE);
        let px = Math.round(pacman.x / ONE_BLOCK_SIZE);
        let py = Math.round(pacman.y / ONE_BLOCK_SIZE);
        //console.log(gx, gy, px, py);
        let path = findPath(gx, gy, px, py);
        console.log(path);
        renderPath(path);
    }

    calcDistanceGhost(){
        let ghostY = Math.round(this.y / ONE_BLOCK_SIZE);
        calcDistance(ghostX, ghostY);
        console.log(pacman.x, pacman.y);
    }

    renderDistanceGhost () {
        const OFFSET_DG = ONE_BLOCK_SIZE * 0.6;
        let ghostX = Math.round(this.x / ONE_BLOCK_SIZE);
        let ghostY = Math.round(this.y / ONE_BLOCK_SIZE);
        renderDistance(calcDistance(ghostX, ghostY), OFFSET_DG, "green");
    };

    
    move() {
        this.userControl();
        this.forward();
        if (this.wallHit()){
            this.back();
            return;
        }
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
            map[this.upperY()][this.leftX()] == 1 ||
            map[this.downY()][this.leftX()] == 1 ||
            map[this.upperY()][this.rightX()] == 1 ||
            map[this.downY()][this.rightX()] == 1
        ) {
            collided =  true;
        }
        return collided;
    };

    ghostHit() {};

    userControl() {
        if (this.direction == this.nextDirection) return;

        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.forward();
        if (this.wallHit()){
            this.back();
            this.direction = tempDirection;
        }
        else {
            this.back();
        };
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

};


let createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < GHOSTS_POSITIONS.length; i++){
        for (let j = 0; j < GHOSTS_POSITIONS[i].length; j++)
        {
            let newGhost = new Ghost(
                (GHOST_HOUSE_X + 2 * i )*ONE_BLOCK_SIZE,
                (GHOST_HOUSE_Y + j)*ONE_BLOCK_SIZE,
                ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
                GHOST_SPEED,
                GHOSTS_POSITIONS[i][j][0], GHOSTS_POSITIONS[i][j][1],
                GHOST_WIDTH, GHOST_HEIGHT,
                GHOST_RANGE,
                GHOST_NAMES[i+2*j]
            );    
            ghosts.push(newGhost);
        };
    };
};

let drawGhosts = () => {
    for ( let i = 0; i < ghosts.length; i++){
        ghosts[i].draw();
    }
}

let updateGhosts = () => {
    for(let i = 0; i < ghosts.length; i++) {
        ghosts[i].pacmanNear();
    }
}