const ghostFrames = document.getElementById("ghosts");
const GHOST_SPEED = PACMAN_SPEED / 1.6;
const GHOST_RANGE = ONE_BLOCK_SIZE * 5;
const GHOST_SIZE = ONE_BLOCK_SIZE * 0.95;
const MAX_GHOSTS = 4;
const GHOST_HOUSE_X = 9;
const GHOST_HOUSE_Y = 10;
const GHOST_START = [
    [GHOST_HOUSE_X, GHOST_HOUSE_Y],
    [GHOST_HOUSE_X, GHOST_HOUSE_Y + 1],
    [GHOST_HOUSE_X + 2, GHOST_HOUSE_Y],
    [GHOST_HOUSE_X + 2, GHOST_HOUSE_Y + 1]
];
CHASED_GHOST_COLOR = "#05014a";


// const GHOST_START = [[1, 1], [5, 10], [11, 10], [20, 15]];
const GHOSTS_POSITIONS = [
    [[0, 0], [176, 0]],
    [[0, 121], [176, 121]]
];
const GHOST_NAMES = ["Vermelhaldo", "Chiclete", "Asmarelo", "Carlos"];
const COLORS = ["red", "purple", "yellow", "light blue"];
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
    constructor(x, y, width, height, speed,
        imgX, imgY, imgWidth, imgHeight, range, name, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = DIRECTION_RIGHT;
        this.speed = speed;
        this.xspeed = speed;
        this.yspeed = speed;
        this.target = pacman;
        this.path = [];
        // take the "right ghost from the file"
        this.imgX = imgX;
        this.imgY = imgY;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.range = range;
        this.name = name;
        this.color = color;
    };

    go() {
        let px = this.path[0][1] * ONE_BLOCK_SIZE;
        let py = this.path[0][0] * ONE_BLOCK_SIZE;
        let gx = this.x;
        let gy = this.y;
        let dx = gx - px;
        let dy = gy - py;

        if (dx == 0.00 && dy == 0.00) {
            this.path.shift();
            return;
        };

        let xs = this.xspeed;
        let ys = this.yspeed;

        if (dx > 0) {
            xs = -xs;
            ys = 0;
            this.direction = DIRECTION_LEFT;
            // console.log(this.color, " going left");
            this.x += xs;
            this.y += ys;
            this.y = Math.floor(this.y / ONE_BLOCK_SIZE) * ONE_BLOCK_SIZE;
            return;
        };
        if (dx < 0) {
            xs = xs;
            ys = 0;
            this.direction = DIRECTION_RIGHT;
            // console.log(this.color, " going right");
            this.x += xs;
            this.y += ys;
            this.y = Math.floor(this.y / ONE_BLOCK_SIZE) * ONE_BLOCK_SIZE;
            return;
        };
        if (dy > 0) {
            xs = 0;
            ys = -ys;
            this.direction = DIRECTION_UP;
            //  console.log(this.color, " going up");
            this.x += xs;
            this.y += ys;
            this.x = Math.floor(this.x / ONE_BLOCK_SIZE) * ONE_BLOCK_SIZE;
            return;
        };
        if (dy < 0) {
            xs = 0;
            ys = +ys;
            this.direction = DIRECTION_DOWN;
            //     console.log(this.color, " going down");
            this.x += xs;
            this.y += ys;
            this.x = Math.floor(this.x / ONE_BLOCK_SIZE) * ONE_BLOCK_SIZE;
            return;
        };

        // console.log("aqui");
        this.x += xs;
        this.y += ys;
    };

    reachedNextPath() {
        let px = this.path[0][1] * ONE_BLOCK_SIZE;
        let py = this.path[0][0] * ONE_BLOCK_SIZE;
        let gx = this.x;
        let gy = this.y;
        let dx = gx - px;
        let dy = gy - py;
        if (dx == 0 && dy == 0) {
            /* console.log(this.name, "sliced a path.", "px: ", px,
                "gx: ", gx,
                "py: ", py,
                "gy: ", gy,
                "dx: ", dx,
                "dy: ", dy);
            */
            this.path.shift();
        };
    };
    chooseNextDirection() {
        let px = this.path[0][1] * ONE_BLOCK_SIZE;
        let py = this.path[0][0] * ONE_BLOCK_SIZE;
        let gx = this.x;
        let gy = this.y;
        let dx = gx - px;
        let dy = gy - py;

        if (dx > 0 && dy == 0) {
            this.direction = DIRECTION_LEFT;
            //     console.log(this.name, this.color, " going left");
            return;
        };
        if (dx < 0 && dy == 0) {
            this.direction = DIRECTION_RIGHT;
            //   console.log(this.name, this.color, " going right");
            return;
        };
        if (dy > 0 && dx == 0) {
            this.direction = DIRECTION_UP;
            //    console.log(this.name, this.color, " going up");
            return;
        };
        if (dy < 0 && dx == 0) {
            this.direction = DIRECTION_DOWN;
            //    console.log(this.name, this.color, " going down");
            return;
        };
        // console.log(this.name, "didn't find a direction!");
    };
    forward() {
        switch (this.direction) {
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_DOWN:
                this.y += this.speed;
                break;
        };
    };
    undoForward() {
        switch (this.direction) {
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                break;
        };
    };
    collided() {
        let iscollided = false;
        let u = Math.floor((this.y) / ONE_BLOCK_SIZE);
        let d = Math.floor((this.y + this.height) / ONE_BLOCK_SIZE - 0.001);
        let l = Math.floor((this.x) / ONE_BLOCK_SIZE);
        let r = Math.floor((this.x + this.width) / ONE_BLOCK_SIZE - 0.001);
        if (//could use ^XOR instead of ||OR but in this game no 2-collisions
            // should occur at a same move.
            MAP[u][l] == WALL ||
            MAP[u][r] == WALL ||
            MAP[d][l] == WALL ||
            MAP[d][r] == WALL
        ) {
            //    console.log(this.name, "is colliding: ", this.y, this.y + this.height, this.x, this.x + this.width, this.direction, this.path[0]);
            iscollided = true;
        }
        return iscollided;
    };

    moveAlone() {
        this.chooseFollowTarget();
        this.chooseNextDirection();
        this.forward();
        if (this.collided()) {
            this.undoForward();
        };
        this.reachedNextPath();
    };

    // moveUser(){};

    pacmanNear() {
        return this.pointNear(pacman.x, pacman.y);
    };
    pointNear(pointX, pointY) {
        let pointNear = false;
        let xdis = this.x - pointX;
        let ydis = this.y - pointY;
        let dispoint = Math.sqrt(xdis ** 2 + ydis ** 2);
        if (dispoint < this.range) {
            pointNear = true;
        };
        return pointNear;
    };


    chooseFollowTarget() {
        if (this.pacmanNear()) {
            this.target = pacman;
            this.findPath();
            //console.log("pacman near to ", this.name, this.color);
        };
        if (!this.pacmanNear() && this.target == pacman) {
            this.randomTarget();
        };
        if (!this.pacmanNear() && this.target != pacman && this.path.length == 0) {
            this.randomTarget();
        };

    };
    randomTarget() {
        let isSamePlace = true;
        while (isSamePlace) {
            let randomY = Math.floor(Math.random() * MAP.length);
            let randomX = Math.floor(Math.random() * MAP[1].length);
            if (MAP[randomY][randomX] != WALL &&
                !this.pointNear(randomX * ONE_BLOCK_SIZE, randomY * ONE_BLOCK_SIZE)
            ) {
                this.target = {
                    x: randomX * ONE_BLOCK_SIZE,
                    y: randomY * ONE_BLOCK_SIZE
                };
                this.findPath();
                isSamePlace = false;
            };
        };
    };

    findPath() {
        let gx = Math.floor(this.x / ONE_BLOCK_SIZE + 0.5);
        let gy = Math.floor(this.y / ONE_BLOCK_SIZE + 0.5);
        let tx = Math.floor(this.target.x / ONE_BLOCK_SIZE + 0.5);
        let ty = Math.floor(this.target.y / ONE_BLOCK_SIZE + 0.5);
        this.path = findPath(tx, ty, gx, gy);
    };

    draw() {
        if (!pacman.superModeOn) {
            ctx.save();
            ctx.drawImage(
                ghostFrames,
                this.imgX, this.imgY,
                this.imgWidth, this.imgHeight,
                this.x, this.y,
                GHOST_SIZE, GHOST_SIZE
            );
            ctx.restore();
        };
        if (pacman.superModeOn) {
            ctx.save();
            ctx.rect(this.x, this.y, this.width, this.height, CHASED_GHOST_COLOR);
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.restore();
        };
    };

    drawRange() {
        ctx.beginPath();
        ctx.arc(
            (Math.round(this.x / ONE_BLOCK_SIZE) + 0.5) * ONE_BLOCK_SIZE,
            (Math.round(this.y / ONE_BLOCK_SIZE) + 0.5) * ONE_BLOCK_SIZE,
            this.range,
            0,
            (Math.PI / 180) * 360
        );
        ctx.stroke();
    };
};

let createGhosts = () => {
    ghosts = [];
    let mi = GHOSTS_POSITIONS.length;
    let mj = GHOSTS_POSITIONS[1].length;
    for (let i = 0; i < mi; i++) {
        for (let j = 0; j < mj; j++) {
            // for (let i = 0; i < 1; i++) {
            //    for (let j = 0; j < 1; j++) {
            let newGhost = new Ghost(
                GHOST_START[i + 2 * j][0] * ONE_BLOCK_SIZE,
                GHOST_START[i + 2 * j][1] * ONE_BLOCK_SIZE,
                ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
                GHOST_SPEED,
                GHOSTS_POSITIONS[i][j][0], GHOSTS_POSITIONS[i][j][1],
                GHOST_WIDTH, GHOST_HEIGHT,
                GHOST_RANGE,
                GHOST_NAMES[i + 2 * j],
                COLORS[i + 2 * j]
            );
            ghosts.push(newGhost);
            // console.log(newGhost);
        };
    };
};
let drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
        //ghosts[i].drawHitBox();
        //ghosts[i].drawRange();
        renderPath(ghosts[i].path, ghosts[i].color);

    };
};
let updateGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveAlone();
    }
};



