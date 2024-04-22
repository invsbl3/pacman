const pacmanFrames = document.getElementById("pacman");
const DIRECTION_RIGHT = 4;
const DIRECTION_LEFT = 2;
const DIRECTION_UP = 3;
const DIRECTION_DOWN = 1;
const PACMAN_TOTAL_FRAMES = 7;
const FIRST_FRAME = 1;
const MAX_TIMEOUT_ANIMATION = 100;
const PACMAN_SPEED = ONE_BLOCK_SIZE / 5;



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

        setInterval (() => {
            this.anim();
        }, MAX_TIMEOUT_ANIMATION);
    }

    move() {
        this.userControl();
        this.forward();
        if (this.wallHit()){
            this.back();
            return;
        }

    }
    eat () {}
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
            map[this.upperY()][this.leftX()] == 1 ||
            map[this.downY()][this.leftX()] == 1 ||
            map[this.upperY()][this.rightX()] == 1 ||
            map[this.downY()][this.rightX()] == 1
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
        context.save();
        context.translate(
            this.x + ONE_BLOCK_SIZE / 2,
            this.y + ONE_BLOCK_SIZE / 2
        );
        context.rotate( (this.direction * 90 * Math.PI) / 180 );
        context.translate(
            - ( this.x + ONE_BLOCK_SIZE / 2 ),
            - ( this.y + ONE_BLOCK_SIZE / 2 )
        );
        context.drawImage(
            pacmanFrames,
            ( this.frame - 1 ) * ONE_BLOCK_SIZE,
            0,
            ONE_BLOCK_SIZE, ONE_BLOCK_SIZE,
            this.x, this.y,
            this.width, this.height
        );
        context.restore();
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




