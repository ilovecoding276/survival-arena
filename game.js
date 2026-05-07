let canvas =
    document.getElementById("gameCanvas");

let ctx =
    canvas.getContext("2d");



let player = {
    x: 375,
    y: 430,
    width: 50,
    height: 50,
    speed: 6
};



let keys = {};



let enemies = [];



let score = 0;

let lives = 3;

let gameOver = false;

let level = 1;



document.addEventListener(
    "keydown",
    function(event) {

        keys[event.key] = true;

    }
);



document.addEventListener(
    "keyup",
    function(event) {

        keys[event.key] = false;

    }
);



function createEnemy() {

    let enemy = {

        x:
            Math.random() *
            750,

        y: -50,

        width: 50,

        height: 50,

        speed:
            2 + level

    };



    enemies.push(enemy);

}



function movePlayer() {

    if (keys["ArrowLeft"]) {

        player.x =
            player.x -
            player.speed;

    }



    if (keys["ArrowRight"]) {

        player.x =
            player.x +
            player.speed;

    }



    if (keys["ArrowUp"]) {

        player.y =
            player.y -
            player.speed;

    }



    if (keys["ArrowDown"]) {

        player.y =
            player.y +
            player.speed;

    }



    if (player.x < 0) {

        player.x = 0;

    }



    if (player.x > 750) {

        player.x = 750;

    }



    if (player.y < 0) {

        player.y = 0;

    }



    if (player.y > 450) {

        player.y = 450;

    }

}



function moveEnemies() {

    for (
        let i = 0;
        i < enemies.length;
        i++
    ) {

        enemies[i].y =
            enemies[i].y +
            enemies[i].speed;

    }

}



function checkCollisions() {

    for (
        let i = 0;
        i < enemies.length;
        i++
    ) {

        let enemy =
            enemies[i];



        if (

            player.x <
            enemy.x + enemy.width &&

            player.x + player.width >
            enemy.x &&

            player.y <
            enemy.y + enemy.height &&

            player.y + player.height >
            enemy.y

        ) {

            enemies.splice(i, 1);

            lives =
                lives - 1;

        }

    }

}



function removeEnemies() {

    for (
        let i = 0;
        i < enemies.length;
        i++
    ) {

        if (
            enemies[i].y > 500
        ) {

            enemies.splice(i, 1);

            score =
                score + 1;

        }

    }

}



function levelSystem() {

    if (score > 10) {

        level = 2;

    }



    if (score > 25) {

        level = 3;

    }



    if (score > 50) {

        level = 4;

    }

}



function drawPlayer() {

    ctx.fillStyle =
        "deepskyblue";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}



function drawEnemies() {

    ctx.fillStyle =
        "red";



    for (
        let i = 0;
        i < enemies.length;
        i++
    ) {

        let enemy =
            enemies[i];



        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

    }

}



function drawText() {

    ctx.fillStyle =
        "white";

    ctx.font =
        "24px Arial";



    ctx.fillText(
        "Score: " + score,
        20,
        40
    );



    ctx.fillText(
        "Lives: " + lives,
        20,
        80
    );



    ctx.fillText(
        "Level: " + level,
        20,
        120
    );

}



function drawGameOver() {

    ctx.fillStyle =
        "white";

    ctx.font =
        "50px Arial";



    ctx.fillText(
        "GAME OVER",
        250,
        250
    );

}



function updateGame() {

    if (gameOver) {

        drawGameOver();

        return;

    }



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    movePlayer();

    moveEnemies();

    checkCollisions();

    removeEnemies();

    levelSystem();



    drawPlayer();

    drawEnemies();

    drawText();



    if (lives <= 0) {

        gameOver = true;

    }



    requestAnimationFrame(
        updateGame
    );

}



setInterval(
    createEnemy,
    1000
);



updateGame();