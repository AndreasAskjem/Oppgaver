let snake;
let boardSize = {
    height: 10,
    width: 15
}
let boardModel;
initSnakePosition();
initBoardModel();
showBoard();

function initSnakePosition(){
    snake = {}
    let startHeight = Math.floor(boardSize.height/2);
    snake.position = [[2, startHeight],[1, startHeight],[0, startHeight]];
    snake.size = 3;
}



function initBoardModel(){
    boardModel = {};
    boardModel.rows = [];

    for(rowIndex=0; rowIndex<boardSize.height; rowIndex++){
        let newRow = {};
        newRow.cells = [];
        for(cellIndex=0; cellIndex<boardSize.width; cellIndex++){
            let newCell = {};
            newCell.hasHead = false;
            newCell.hasSnake = false;
            newCell.hasApple = false;
            newRow.cells.push(newCell);
        }
        boardModel.rows.push(newRow);
    }
}

function placeSnake(){
    if(snake.position[0] == [rowIndex, cellIndex]){
        newCell.hasHead = true;
    }
}

let boardView = document.getElementById('snakeTable');

function showBoard(){
    boardView.innerHTML = '';
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        let viewRow = mineFieldView.insertRow();
        let modelRow = mineFieldModel.rows[rowIndex];
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            let viewCell = viewRow.insertCell();
            let modelCell = modelRow.cells[cellIndex];

            if(modelCell){
                b;
            }
        }
    }
}