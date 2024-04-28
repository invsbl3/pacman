const pacmanFrames = document.getElementById("pacman");

const PACMAN_DIMENSIONS = [ONE_BLOCK_SIZE, ONE_BLOCK_SIZE];
const START_POSITION = [ONE_BLOCK_SIZE, ONE_BLOCK_SIZE];
const PACMAN_SPEED = ONE_BLOCK_SIZE / 5;
const INITIAL_FRAME = 1;
const PACMAN_TOTAL_FRAMES = 7;
const SUPER_MODE_TIME = 8000; // 8[s] = 8000[ms]

class Pacman {
    constructor(posX, posY, width, height, direction, speed, color) {
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.speed = speed;
        this.frame = INITIAL_FRAME;
        this.frameCount = PACMAN_TOTAL_FRAMES;
        this.color = color;
        this.nextDirection = direction;
        this.superModeOn = false;
        setInterval(() => {
            this.anim();
        }, MAX_PACMAN_TIMEOUT);
    };
    draw() {
        ctx.save();
        ctx.translate(
            this.x + ONE_BLOCK_SIZE / 2,
            this.y + ONE_BLOCK_SIZE / 2
        );
        ctx.rotate((this.direction * 90 * Math.PI) / 180);
        ctx.translate(
            -this.x - ONE_BLOCK_SIZE / 2,
            -this.y - ONE_BLOCK_SIZE / 2
        );
        ctx.drawImage(
            pacmanFrames,
            (this.frame - 1) * ONE_BLOCK_SIZE,
            0,
            ONE_BLOCK_SIZE,
            ONE_BLOCK_SIZE,
            this.x,
            this.y,
            this.width,
            this.height
        );
        ctx.restore();
    };
    anim() {
        this.frame = this.frame == this.frameCount ? 1 : this.frame + 1;
    };
    move() {
        this.changeDirectionIfPossible();
        this.forward();
        if (this.collided()) {
            this.undoForward();
            return;
        }
        else {
            this.eat();
        };
    };
    changeDirectionIfPossible() {
        if (this.direction == this.nextDirection) return;
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.forward();
        if (this.collided()) {
            this.undoForward();
            this.direction = tempDirection;
        } else {
            this.undoForward();
        }
    }
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
        let d = Math.floor((this.y + this.height) / ONE_BLOCK_SIZE - 0.01);
        let l = Math.floor((this.x) / ONE_BLOCK_SIZE);
        let r = Math.floor((this.x + this.width) / ONE_BLOCK_SIZE - 0.01);
        if (//could use ^XOR instead of ||OR but in this game no 2-collisions
            // should occur at a same move.
            MAP[u][l] == WALL ||
            MAP[u][r] == WALL ||
            MAP[d][l] == WALL ||
            MAP[d][r] == WALL
        ) {
            iscollided = true;
        }
        return iscollided;
    };
    ghosted() {
        let isGhosted = false;
        let py = Math.floor((this.y) / ONE_BLOCK_SIZE);
        let px = Math.floor((this.x) / ONE_BLOCK_SIZE);
        for (let i = 0; i < ghosts.length; i++) {
            let gy = Math.floor(ghosts[i].y / ONE_BLOCK_SIZE);
            let gx = Math.floor(ghosts[i].x / ONE_BLOCK_SIZE);
            if (gx == px && gy == py) {
                isGhosted = true;
                // console.log("ghostedby: ", ghosts[i].name, ghosts[i].color);
            }
        };
        return isGhosted;
    };
    eat() {
        let u = Math.floor((this.y) / ONE_BLOCK_SIZE);
        let l = Math.floor((this.x) / ONE_BLOCK_SIZE);
        if (MAP[u][l] == FOOD) {
            score += FRUIT_POINTS;
            MAP[u][l] = PATH;
        };
        if (MAP[u][l] == SUPR) {
            score += SUPER_FOOD_POINTS;
            MAP[u][l] = PATH;
            this.superMode();
        };
    };
    superMode() {
        this.superModeOn = true;
        setTimeout(() => {
            this.superModeOn = false;
        }, SUPER_MODE_TIME);
    };
    calcDistancePacman() {
        let pacmanX = Math.round(this.x / ONE_BLOCK_SIZE);
        let pacmanY = Math.round(this.y / ONE_BLOCK_SIZE);
        calcDistance(pacmanX, pacmanY);
    };
    renderDistancePacman() {
        const OFFSET_PM = ONE_BLOCK_SIZE * 0;
        let pacmanX = Math.round(this.x / ONE_BLOCK_SIZE);
        let pacmanY = Math.round(this.y / ONE_BLOCK_SIZE);
        renderDistance(calcDistance(pacmanX, pacmanY), OFFSET_PM, "red");
    };
};

let createPacman = () => {
    pacman = new Pacman(START_POSITION[0], START_POSITION[1],
        PACMAN_DIMENSIONS[0], PACMAN_DIMENSIONS[1],
        DIRECTION_RIGHT, PACMAN_SPEED, COLORS[1]
    );
};

let updatePacman = () => {
    pacman.move();
    pacman.eat();
    pacman.ghosted();
};

let drawPacman = () => {
    pacman.draw();
    //pacman.renderDistancePacman();
};