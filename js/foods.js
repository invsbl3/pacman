const SUPER_FOOD_POINTS = 5;
const FRUIT_POINTS = 1;

FOOD_SIZE = ONE_BLOCK_SIZE / 8;
FOOD_OFFSET = (ONE_BLOCK_SIZE - FOOD_SIZE) / 2;
FOOD_COLOR = "white";

SUPER_FOOD_SIZE = ONE_BLOCK_SIZE / 4;
SUPER_FOOD_OFFSET = (ONE_BLOCK_SIZE - SUPER_FOOD_SIZE) / 2;
SUPER_FOOD_COLOR = "green";
SUPER_FOOD_SKIN_COLOR = "white";

let drawFoods = () => {
    let foodcount = 0;
    for (let i = 0; i < MAP.length; i++) {
        for (let j = 0; j < MAP[i].length; j++) {
            if (MAP[i][j] == FOOD) {
                drawFood(i, j);
                foodcount += 1;
            }
            else if (MAP[i][j] == SUPR) {
                drawSuperFood(i, j);
                foodcount += 1;
            };
        };
    };
    if (foodcount == 0) { zeroFood(); };
};

let drawFood = (i, j) => {
    Rectangle(
        j * ONE_BLOCK_SIZE + FOOD_OFFSET,
        i * ONE_BLOCK_SIZE + FOOD_OFFSET,
        FOOD_SIZE,
        FOOD_SIZE,
        FOOD_COLOR
    );
};

let drawSuperFood = (i, j) => {
    ctx.beginPath();
    ctx.arc(
        j * ONE_BLOCK_SIZE + ONE_BLOCK_SIZE / 2,
        i * ONE_BLOCK_SIZE + ONE_BLOCK_SIZE / 2,
        SUPER_FOOD_SIZE,
        0, 360 * (Math.PI / 180)
    );
    ctx.fillStyle = SUPER_FOOD_COLOR;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = SUPER_FOOD_SKIN_COLOR;
    ctx.stroke();
};