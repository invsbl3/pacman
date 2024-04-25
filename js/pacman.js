const pacmanFrames = document.getElementById("pacman");
const DIRECTION_RIGHT = 4;
const DIRECTION_LEFT = 2;
const DIRECTION_UP = 3;
const DIRECTION_DOWN = 1;
const PACMAN_TOTAL_FRAMES = 7;
const FIRST_FRAME = 1;
const PACMAN_SIZE = ONE_BLOCK_SIZE * 0.95;

const SUPER_MODE_TIME = 8000; // 8[s] = 8000[ms]
const FOOD_POINTS = 1;
const SUPER_POINTS = 5;

class Pacman {
    constructor ( x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = DIRECTION_RIGHT;
        this.frame = FIRST_FRAME;
        this.frameCount = PACMAN_TOTAL_FRAMES;
        this.superModeOn = false;

        setInterval (() => {
            this.anim();
        }, MAX_PACMAN_TIMEOUT);
    }

    move() {
        this.userControl();
        this.forward();
        if (this.wallHit()){
            this.back();
            return;
        }

    }
    eat () {
        // if pacman is in a position with food, eat the piece
        // change the map pos to "no-food", mark score

        // this is a diffent implementation idea
        // compared with the original project !

        //little bug about pacman account "eat()" just when the border is aligned!
        if (MAP[this.upperY()][this.leftX()] == FOOD) {
            MAP[this.upperY()][this.leftX()] = PATH;
            score += FOOD_POINTS;
        }
          // if pacman is in a position with super-food
        // eats and get super-powers for 8s
        else if (MAP[this.upperY()][this.leftX()] == SUPR) {
            MAP[this.upperY()][this.leftX()] = PATH;
            this.superMode();
            score += SUPER_POINTS;
        };
    };

    superMode() {
        this.superModeOn = true;
        setInterval (() => {
            this.superModeOn = false;
        }, SUPER_MODE_TIME);


    }

    back() {
       // remember that the canvas have
        // origin on top left, and the horizontal x
        // grows to the left
        // and the vertical y grows going down!
        switch(this.direction){
            case DIRECTION_LEFT:
                this.x = Math.round((this.x + this.speed)/ONE_BLOCK_SIZE)*ONE_BLOCK_SIZE;
                break;
            case DIRECTION_RIGHT:
                this.x = Math.round((this.x - this.speed)/ONE_BLOCK_SIZE)*ONE_BLOCK_SIZE;
                break;
            case DIRECTION_UP:
                this.y = Math.round((this.y + this.speed)/ONE_BLOCK_SIZE)*ONE_BLOCK_SIZE;
                break;
            case DIRECTION_DOWN:
                this.y = Math.round((this.y - this.speed)/ONE_BLOCK_SIZE)*ONE_BLOCK_SIZE;
                break;
        }
    }


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
    }
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
    }
    ghostHit() {};
    anim() {
        this.frame  = this.frame == this.frameCount ? 1: this.frame + 1;
    };
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

    calcDistancePacman(){
        let pacmanX = Math.round(this.x / ONE_BLOCK_SIZE);
        let pacmanY = Math.round(this.y / ONE_BLOCK_SIZE);
        calcDistance(pacmanX, pacmanY);
    }

    renderDistancePacman () {
        const OFFSET_PM = ONE_BLOCK_SIZE * 0;
        let pacmanX = Math.round(this.x / ONE_BLOCK_SIZE);
        let pacmanY = Math.round(this.y / ONE_BLOCK_SIZE);
        renderDistance(calcDistance(pacmanX, pacmanY), OFFSET_PM, "red");
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

}

let createPacman = () => {
    pacman = new Pacman(
        ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
        PACMAN_SIZE, PACMAN_SIZE,
        PACMAN_SPEED
    )
};


