const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const GRID_SIZE = 50;

/*** Objects ***/

const player = new Player(0, 0, GRID_SIZE, GRID_SIZE);
let pickups = [];

let scoreCounter = document.getElementById('score_count');
let youWin = document.getElementById('you_win');
let youLose = document.getElementById('you_lose');
let hitCounter = document.getElementById('hit_count');

youWin.innerHTML = "";
youLose.innerHTML = "";

let isKeyActive = true;

let enemies = [];

/***************/

let pickupAmount = 6;
let enemyAmount = 3;
function init() {
    let xArray = [50, 150, 200, 250, 300, 350, 400, 450];
    let yArray = [50, 150, 200, 250, 300, 350, 400, 450];
    for (let i = 0; i < pickupAmount; i++) {
        let pi_x = xArray[Math.floor(Math.random() * xArray.length)];
        let pi_y = yArray[Math.floor(Math.random() * yArray.length)];
        pickups.push (
            new Pickup(
              pi_x, pi_y,
            GRID_SIZE, GRID_SIZE)
        );
    }
    let e_xArray = [100, 200, 300, 400];
    let e_yArray = [100, 200, 300, 400];
    for (let i = 0; i < enemyAmount; i++) {
        let e_x = e_xArray[Math.floor(Math.random() * e_xArray.length)];
        let e_y = e_yArray[Math.floor(Math.random() * e_yArray.length)];
        enemies.push (
            new Enemy(
                e_x, e_y,
            GRID_SIZE, GRID_SIZE)
        );
    }
    for (let i = 0; i < pickups.length; i++) {
        if (pickups[i] !== null) {
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i] !== null) {
                    if (enemies[i].intersects(pickups[i])) {
                        switch ((Math.random() * 4) + 1) {
                            case 0:
                                enemies[i].move(0, 1);
                                break;
                            case 1:
                                enemies[i].move(0, -1);
                                break;
                            case 2:
                                enemies[i].move(1, 0);
                                break;
                            case 3:
                                enemies[i].move(-1, 0);
                                break;
                        }
                    }
                }
            }
        }
    }
}

function tick() {
    if (player !== null) {
        player.tick();
    }
    for (let i = 0; i < pickups.length; i++) {
        if (pickups[i] !== null) {
            pickups[i].tick();
        }
    }
    scoreCounter.innerHTML = player.scoreCount;
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] !== null) {
            enemies[i].tick();
            let random_mx = Math.floor(Math.random() * 5) - 2;
            let random_my = Math.floor(Math.random() * 5) - 2;
            enemies[i].move(random_mx, random_my);
            if (player.intersects(enemies[i])) {
                player.x = 0;
                player.y = 0;
                player.hitAmount++;
                hitCounter.innerHTML = player.hitAmount;
            }
        }
    }
}

function render(context) {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < pickups.length; i++) {
        if (pickups[i] !== null) {
          pickups[i].render(context);
        }
    }
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] !== null) {
            enemies[i].render(context);
        }
    }
    if (player !== null) {
        player.render(context);
        if (player.scoreCount === 6) {
            youWin.innerHTML = "You Win!";
            scoreCounter.innerHTML = "";
            hitCounter.innerHTML = "";
            isKeyActive = false;
            player.x = 0;
            player.y = 0;
            for (let i = 0; i < enemies.length; i++) {
                enemies[i] = null;
                enemies.splice(0, i);
            }
        }
        if (player.hitAmount === 3) {
            context.fillStyle = "red";
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            youLose.innerHTML = "YOU LOSE!";
            for (let i = 0; i < enemies.length; i++) {
                enemies[i] = null;
                enemies.splice(0, i);
            }
            for (let i = 0; i < pickups.length; i++) {
                pickups[i] = null;
                enemies.splice(0, i);
            }
            scoreCounter.innerHTML = "";
            hitCounter.innerHTML = "";
        }
    }
    for (let i = 0; i < pickups.length; i++) {
        if (pickups[i] !== null) {
            if (player !== null) {
                if (player.intersects(pickups[i])) {
                    pickups[i].shouldDraw = false;
                    pickups.splice(i, 1);
                    player.scoreCount++;
                    scoreCounter.innerHTML = player.scoreCount;
                }
            }
        }
    }
}

function funcs() {
    tick();
    render(context);
}

init();
setInterval(funcs, 100);

document.addEventListener("keydown",
    event => {
        if (isKeyActive) {
            switch (event.keyCode) {
                case 37:
                    player.move(-1, 0);
                    break;
                case 38:
                    player.move(0, -1);
                    break;
                case 39:
                    player.move(1, 0);
                    break;
                case 40:
                    player.move(0, 1);
                    break;
            }
        }
    }
);

document.addEventListener("keyup",
    event => {
        player.move(0, 0);
    }
);
