FOOD_SIZE = ONE_BLOCK_SIZE / 8;
FOOD_OFFSET = ( ONE_BLOCK_SIZE - FOOD_SIZE ) / 2;
FOOD_COLOR = "white";

let drawFoods = () => {
    for ( let i = 0; i < map.length; i++ ) {
        for ( j = 0; j < map[i].length; j++ ) {
            if ( map[i][j] == 2) {
                Rectangle(
                    j * ONE_BLOCK_SIZE + FOOD_OFFSET,
                    i * ONE_BLOCK_SIZE + FOOD_OFFSET,
                    FOOD_SIZE,
                    FOOD_SIZE,
                    FOOD_COLOR
                );
            };
        };
    };
};