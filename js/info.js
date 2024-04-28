let drawScore = () => {
    ctx.font = "Emulogic";
    ctx.fillStyle = "white";
    ctx.fillText(
        "Score: " + score, 0, ONE_BLOCK_SIZE * (MAP.length + 1) + 5
    );
};

let drawSuper = () => {
    if (pacman.superModeOn) {
        ctx.font = "Emulogic";
        ctx.fillStyle = "white";
        ctx.fillText(
            "SUPER MODE ", 0, ONE_BLOCK_SIZE * (MAP.length + 2) + 5
        );
    };
};