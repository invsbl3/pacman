let calcDistance = (sCol, sRow) => {
    const rows = MAP.length;
    const columns = MAP[0].length;

    let visited = Array(rows).fill().map(() => Array(columns).fill(false));
    let distance = Array(rows).fill().map(() => Array(columns).fill(0));
    let source = [sRow, sCol];
    visited[source[0]][source[1]] = true;
    let toCheck = [source];
    const TOTAL_POINTS = rows * columns
    let visited_points = 0;
    let nextCheck = [];

    iter = 0;
    while(iter < TOTAL_POINTS){
        for (let i = 0; i < toCheck.length; i++) {
            let row = toCheck[i][0];
            let col = toCheck[i][1];
            let dist = distance[row][col]
            checkNeigbours(row, col, dist);
        }
        toCheck = nextCheck;
        iter ++;
    };
    return distance;

    function checkNeigbours (x, y, dist) {
        checkPoint( x  , y+1, dist);
        checkPoint( x+1, y  , dist);
        checkPoint( x  , y-1, dist);
        checkPoint( x-1, y  , dist);
        };
        
        function checkPoint (x, y, dist) {
        if ( x >= 0 && x < rows
            && y >= 0 && y < columns
            && visited[x][y] == false) {
                visited[x][y] = true;
                visited_points ++;
                if ( MAP[x][y] != WALL ) {
                    distance[x][y] = dist + 1;
                    nextCheck.push([x, y]);
                }
                else if (MAP[x][y] == WALL) {
                    distance[x][y] = -1;
                };
            };
        };

};

let renderDistance = (distanceMap, offset, color) => {
    for (let i = 0; i < distanceMap.length; i++) {
        for ( let j = 0; j < distanceMap[i].length; j++){
            ctx.font = "15px Emulogic";
            ctx.fillStyle = color;
            ctx.fillText(
                distanceMap[i][j],
                ONE_BLOCK_SIZE * (j+0.5) ,
                ONE_BLOCK_SIZE * (i+0.5) 
            );
        };
    };
};



let findPath = (tx, ty, sx, sy) => {
    const rows = MAP.length;
    const columns = MAP[0].length;
    let distanceMap = calcDistance(tx, ty);
    let actual_point = [sy, sx];
    let path = [actual_point];
    let max = distanceMap[sy][sx];
    let actual_distance = max;

    let iter = 0;

    while (iter < 100){
        checkNeighbours(actual_point[1], actual_point[0], actual_distance);
        iter ++;
    };
    
    function checkNeighbours (x, y, dist) {
        if     (checkPoint( x  , y+1, dist)){checkPoint( x  , y+1, dist);};
        if(checkPoint( x  , y-1, dist)){checkPoint( x  , y-1, dist); };
        if(checkPoint( x+1, y  , dist)){checkPoint( x+1, y  , dist); };
        if(checkPoint( x-1, y  , dist)){checkPoint( x-1, y  , dist)};
        };
        
    function checkPoint (x, y, dist) {
    if ( x >= 0 && x < columns
        && y >= 0 && y < rows
        && distanceMap[y][x] == (actual_distance - 1) ){
            path.push([y,x]);
            actual_point = [y,x];
            actual_distance = distanceMap[y][x];
            return true;
        };
    };
    return path;
};


let renderPath = (path) => {
    for (let i = 0; i < path.length; i++) {
        Rectangle (path[i][1] * ONE_BLOCK_SIZE, path[i][0] * ONE_BLOCK_SIZE,
            ONE_BLOCK_SIZE*0.6, ONE_BLOCK_SIZE*0.6,
        "blue");
        };
};

