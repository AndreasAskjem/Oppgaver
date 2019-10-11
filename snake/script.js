
let boardModel;
let boardView = document.getElementById('board');
let size = {
    width: 2,
    height: 2
};

//init(size);
//showBoard();


init();
setInterval(placeApple, 500);
function init(){
    boardModel = {};
    boardModel.rows = [];

    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        let newRow = {};
        newRow.cells = [];
        for(newCell=0; newCell<size.width; newCell++){
            let newCell = {};
            newCell.Head = false;
            newCell.Bodey = false;
            newCell.Apple = false;
            newRow.cells.push(newCell);
        }
        boardModel.rows.push(newRow);
    }
    placeSnake();
    placeApple();
    showBoard();
}

function placeSnake(){
    heightPlacement = Math.floor(size.height/2);
    //boardModel.rows[heightPlacement].cells[1].Head = true;
}

function placeApple(){
    let position = randomPosition();
    //let currentCell = boardModel.rows[position.y].cells[position.x];
    /*while(currentCell.Head || currentCell.Body){
        console.log('hello');
        position = randomPosition();
        currentCell = boardModel.rows[position.y].cells[position.x];
    }*/
    
    boardModel.rows[position.y].cells[position.x].Apple = true;
    showBoard();
}

function randomPosition(){
    let x = Math.floor(Math.random()*size.width);
    let y = Math.floor(Math.random()*size.height);
    position = {
        x: x,
        y: y
    }
    return(position);
}

// Creates the shown HTML, with the correct values inserted.
function showBoard(){
    boardView.innerHTML = '';
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        let viewRow = boardView.insertRow();
        let modelRow = boardModel.rows[rowIndex];
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            let viewCell = viewRow.insertCell();
            let modelCell = modelRow.cells[cellIndex];
            if(modelCell.Head){
                viewCell.style.backgroundColor = 'black';
            }
            else if(modelCell.Apple){
                viewCell.style.backgroundColor = 'red';
            }
        }
    }
}