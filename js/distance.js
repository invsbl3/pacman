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
                    distance[x][y] = -20;
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
                ONE_BLOCK_SIZE * (j+0.5) + offset ,
                ONE_BLOCK_SIZE * (i+0.5) + offset
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

    while (actual_distance > 0 ){
        checkNeighbours(actual_point[1], actual_point[0], actual_distance);
    };

    function shuffle (arrayList) { 
        const shuffled = arrayList.slice(); 
        let currentIndex = shuffled.length; 
        let temporaryValue, randomIndex; 
        while (currentIndex !== 0) { 
          randomIndex = Math.floor(Math.random() * currentIndex); 
          currentIndex -= 1; 
          temporaryValue = shuffled[currentIndex]; 
          shuffled[currentIndex] = shuffled[randomIndex]; 
          shuffled[randomIndex] = temporaryValue; 
        }
        return shuffled; 
    }; 

    function checkNeighbours (x, y, dist) {
        // to make the route decision "more aleatory"
        // I'm going to do a random distribution of the blocks to analyse
        // each round, so the algorithm doesn't take always the upper path
        let indexArr = [[0,1],[1,0],[0,-1],[-1,0]];
        // let rd = shuffle(indexArr); // randomized index arrays
        let rd = indexArr;
        let done = false;
        for (let i = 0; i < rd.length; i++){
            if (checkPoint( x + rd[i][0], y + rd[i][1], dist) && done == false) {
                done = true;
                checkPoint( x + rd[i][0], y + rd[i][1], dist);    
            };
        };
    };
        
    function checkPoint (x, y, dist) {
        if ( x >= 0 && x < columns
            && y >= 0 && y < rows
            && distanceMap[y][x] == (actual_distance - 1) )
            {
                path.push([y,x]);
                actual_point = [y,x];
                actual_distance -= 1;
                return true;
            };
    };
    if(path.length > 1){path.shift();};
    return path;
};

let renderPath = (path, color) => {
    const PATH_RECT = ONE_BLOCK_SIZE * 0.4;
    const PATH_RECT_OFFSET = (ONE_BLOCK_SIZE  - PATH_RECT) / 2;
    for (let i = 0; i < path.length; i++) {
        Rectangle (path[i][1] * ONE_BLOCK_SIZE + PATH_RECT_OFFSET,
            path[i][0] * ONE_BLOCK_SIZE + PATH_RECT_OFFSET,
            PATH_RECT,
            PATH_RECT,
        color);
        };
};

let findPaths = (tx, ty, sx, sy) => {
    let paths = [];
    max_iter = 5;
    for (let i=0;i<max_iter;i++){
        let path = findPath(tx, ty, sx, sy);
        if(checkIfIsNewPath(path)){
            paths.push(path);
        };
    };
    
    function checkIfIsNewPath(path){
        let isNew = true;
        for (let i=0;i<paths.length;i++){
            if(path == paths[i]){isNew = false;};
        };
        return isNew;
    };

    return paths;
}

let renderPaths = (paths) => {
    let color = ["white", "green", "blue", "red"];
    for (let i=0;i<paths.length;i++){
        renderPath(paths[i], color[i%4]);
    };
};


/*
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

*/