var snakeModel;
initModel();
updateView();
let gameTick;
function updateView() {
    var snakeTable = document.getElementById('snakeTable');
    snakeTable.innerHTML = '';
    for (var rowIndex = 0; rowIndex < snakeModel.size; rowIndex++) {
        var tr = snakeTable.insertRow();
        for (var columnIndex = 0; columnIndex < snakeModel.size; columnIndex++) {
            var td = tr.insertCell();
        }
    }
    var bodyPart = snakeModel.snakeHead;
    while (bodyPart != null) {
        var td = snakeTable.rows[bodyPart.y].cells[bodyPart.x];
        td.classList.add('snake');
        bodyPart = bodyPart.nextBodyPart;
    }
    var food = snakeModel.food;
    var td = snakeTable.rows[food.y].cells[food.x];
    td.classList.add('apple');
}

function initModel() {
    snakeModel = { size: 10 };
    snakeModel.snakeHead = {x: 2, y:Math.floor(snakeModel.size/2)};
    snakeModel.food = createRandomPosition();
    snakeModel.growCount = 2;
    snakeModel.nextBodyPart = null;
    snakeModel.direction = { x: 1, y: 0 };
}
function createRandomPosition() {
    return {
        x: Math.floor(Math.random() * snakeModel.size),
        y: Math.floor(Math.random() * snakeModel.size)
    }
}
function createNewSnakeHead() {
    return {
        x: snakeModel.snakeHead.x + snakeModel.direction.x,
        y: snakeModel.snakeHead.y + snakeModel.direction.y,
        nextBodyPart: snakeModel.snakeHead
    };
}
function move() {
    if (!snakeModel.direction) return;
    snakeModel.snakeHead = createNewSnakeHead();
    if (snakeModel.growCount > 0) {
        snakeModel.growCount--;
    } else {
        // Slette siste element
        var bodyPart = snakeModel.snakeHead;
        var lastBodyPart = null;
        let isHead = true;
        while (bodyPart.nextBodyPart != null) {
            if(isHead){
                bodyPart.style.backgroundColor = 'blue';
                isHead = false;
            }
            lastBodyPart = bodyPart;
            bodyPart = bodyPart.nextBodyPart;
        }
        if (lastBodyPart !== null) {
            lastBodyPart.nextBodyPart = null;
        }
    }
    if (snakeModel.snakeHead.x === snakeModel.food.x
        && snakeModel.snakeHead.y === snakeModel.food.y) {
        snakeModel.food = createRandomPosition();
        snakeModel.growCount = 1;
    }
    snakeModel.latestMove = snakeModel.direction;

    updateView();
}

let gameIsActive = false
function controlSnake(e) {
    d = snakeModel.latestMove;

    if(!gameIsActive){
        gameTick = setInterval(move, 200);
        gameIsActive = true;
        return;
    }

    if (e.keyCode == 37 && d.x != 1) { // left
        snakeModel.direction = { x: -1, y: 0 };
    } else if (e.keyCode == 39 && d.x != -1) { // right
        snakeModel.direction = { x: 1, y: 0 };
    } else if (e.keyCode == 38 && d.y != 1) { // up
        snakeModel.direction = { x: 0, y: -1 };
    } else if (e.keyCode == 40 && d.y != -1) { // down
        snakeModel.direction = { x: 0, y: 1 };
    }

    else if(e.keyCode == 27){
        stopMove();
    }
}

function stopMove(){
    clearInterval(gameTick);
    gameIsActive = false;
}