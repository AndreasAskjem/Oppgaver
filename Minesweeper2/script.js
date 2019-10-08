
let mineFieldModel;
let mineFieldView = document.getElementById('mineField');
let totalMines = 10;
let size = {
    width: 8,
    height: 8
};

init(size);
showMineField();


function showMineField(){
    mineFieldView.innerHTML = '';
    for(i=0; i<size.height; i++){
        let viewRow = mineFieldView.insertRow();
        let modelRow = mineFieldModel.rows[i];
        for(j=0; j<size.width; j++){
            let viewCell = viewRow.insertCell();
            let modelCell = modelRow.cells[j];

            if(modelCell.isOpen){
                if(modelCell.hasMine){
                    viewCell.style.backgroundColor = 'red';
                    viewCell.innerHTML = '💣'
                }
                else if (modelCell.adjacentMines > 0){
                    viewCell.style.backgroundColor = 'lightgray';
                    viewCell.innerHTML = modelCell.adjacentMines;
                }
                else{
                    viewCell.style.backgroundColor = 'lightgray';

                }
            }
            else{
                viewCell.style.backgroundColor = 'darkgray';
                viewCell.innerHTML = '';
                viewCell.addEventListener("click", clickedSquare, false);
            }
        }
    }
}

let firstClick = true;
let minePlacementRetries = 0;
function clickedSquare(mouseClick){
    let rowIndex = mouseClick.srcElement.parentElement.sectionRowIndex;
    let cellIndex = mouseClick.srcElement.cellIndex;
    let modelCell = mineFieldModel.rows[rowIndex].cells[cellIndex];

    // Generates new mine arrangements either until the clicked field
    // has no adjacent mines, or it has tried 100 times.
    if(firstClick){
        placeMines();
        if(modelCell.adjacentMines>0){
            minePlacementRetries++;
            if(minePlacementRetries>100){
                firstClick = false;
                return;
            }
            clickedSquare(mouseClick);
        }
        firstClick = false;
    }

    openCell(rowIndex, cellIndex);
    showMineField();
}



// Opens a cell.
// Opens all adjacent cells if the cell has no adjacent mines.
function openCell(rowIndex, cellIndex){
    if(rowIndex<0 || rowIndex>=size.height || cellIndex<0 || cellIndex>=size.width){
        return;
    }
    let modelCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
    if(modelCell.isOpen){
        return;
    }
    
    modelCell.isOpen = true;

    if(modelCell.adjacentMines===0){
        openCell(rowIndex-1, cellIndex-1);
        openCell(rowIndex-1, cellIndex);
        openCell(rowIndex-1, cellIndex+1);
        openCell(rowIndex, cellIndex-1);
        openCell(rowIndex, cellIndex+1);
        openCell(rowIndex+1, cellIndex-1);
        openCell(rowIndex+1, cellIndex);
        openCell(rowIndex+1, cellIndex+1);
    }
}



function init(size){
    mineFieldModel = {};
    mineFieldModel.rows = [];

    for(i=0; i<size.height; i++){
        let newRow = {};
        newRow.cells = [];
        for(j=0; j<size.width; j++){
            let newCell = {};
            newCell.isOpen = false;
            newCell.hasMine = false;
            newCell.adjacentMines = 0;
            newRow.cells.push(newCell);
        }
        mineFieldModel.rows.push(newRow);
    }
}



function placeMines(){
    mineArray = generateMines()

    let mineIndex = 0;
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            currentCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
            currentCell.hasMine = mineArray[mineIndex];
            mineIndex++;
        }
    }

    
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            currentCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
            currentCell.adjacentMines = getAdjacentMines(rowIndex, cellIndex);
        }
    }
}

function getAdjacentMines(rowIndex, cellIndex){
    let mineCount = 0;
    for(i=-1; i<2; i++){
        for(j=-1; j<2; j++){
            let rowCheck = rowIndex + i;
            let cellCheck = cellIndex + j;
            
            if(rowCheck>=0 && rowCheck<size.height && cellCheck>=0 && cellCheck<size.width){
                if(mineFieldModel.rows[rowCheck].cells[cellCheck].hasMine){
                    mineCount++;
                }
            }
            
        }
    }
    return(mineCount);
}



function generateMines(){
    boardSize = size.height * size.width;
    mineArray = [];
    for(i=0; i<boardSize; i++){
        if(i<totalMines){
            mineArray.push(true);
        }
        else{
            mineArray.push(false);
        }
    }
    return(shuffleArray(mineArray, boardSize));
}

function shuffleArray(mineArray, boardSize){
    let randomElement;
    let shuffledArray = [];
    for(i=boardSize; i>0; i--){
        randomElement = Math.floor(Math.random() * i);
        temp = mineArray.splice(randomElement, 1);
        shuffledArray.push(temp[0]);
    }
    return(shuffledArray);
}