
let mineFieldModel;
let mineFieldView = document.getElementById('mineField');
let totalMines = 10;
let size = {
    width: 8,
    height: 8
};
let unopenedEmptyCells = size.width*size.height - totalMines;
let availableFlags = totalMines;
let flagMode = false;

init(size);
showMineField();

// Creates the shown HTML, with the correct values inserted.
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
                if(modelCell.hasFlag){
                    viewCell.innerHTML = '🚩';
                }
                else{
                    viewCell.innerHTML = '';
                }
                viewCell.style.backgroundColor = 'darkgray';
                viewCell.addEventListener("click", clickedSquare, false);
            }
        }
    }

    let flagDiv = document.getElementById('flagBox');
    if(flagMode){
        flagDiv.classList.add('redBorder');
    }
    else{
        flagDiv.classList.remove('redBorder');
    }

    document.getElementById('flagCounter').innerHTML = availableFlags;
}

function setDifficulty(newHeight, newWidth, newTotalMines){
    size.height = newHeight;
    size.width = newWidth;
    totalMines = newTotalMines;
    unopenedEmptyCells = size.width*size.height - totalMines;
    availableFlags = totalMines;
    flagMode = false;
    firstClick=true;
    init(size);
    showMineField();
}

function toggleFlagMode(){
    flagMode = !flagMode;
    showMineField();
}

// Runs every time a cell is clicked.
let firstClick = true;
let minePlacementRetries = 0;
function clickedSquare(mouseClick){
    let rowIndex = mouseClick.srcElement.parentElement.sectionRowIndex;
    let cellIndex = mouseClick.srcElement.cellIndex;
    let modelCell = mineFieldModel.rows[rowIndex].cells[cellIndex];

    if(flagMode && !firstClick){
        modelCell.hasFlag = !modelCell.hasFlag;
        if(modelCell.hasFlag){
            availableFlags--;
        }
        else{
            availableFlags++;
        }
        showMineField();
        return;
    }

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

    if(modelCell.hasFlag){
        return;
    }
    // Opens the clicked cell and updates the shown minefield.
    openCell(rowIndex, cellIndex);
    showMineField();
}


// Opens a cell.
// Opens all adjacent cells if the cell has no adjacent mines.
// Repeats until every blank cell connected to the clicked cell has been turned,
// and and all cells next to those blank cells has been opened too.
function openCell(rowIndex, cellIndex){
    if(rowIndex<0 || rowIndex>=size.height || cellIndex<0 || cellIndex>=size.width){
        return;
    }
    let modelCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
    if(modelCell.isOpen){
        return;
    }
    if(!modelCell.hasMine){
        unopenedEmptyCells--;
    }
    modelCell.isOpen = true;
    console.log(unopenedEmptyCells);

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
            newCell.hasFlag = false;
            newRow.cells.push(newCell);
        }
        mineFieldModel.rows.push(newRow);
    }
}



function placeMines(){
    // Gets a shiffled list with the correct amount of mines.
    mineArray = generateMines()

    // Places the mines in the cell objects
    let mineIndex = 0;
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            currentCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
            currentCell.hasMine = mineArray[mineIndex];
            mineIndex++;
        }
    }

    // Sends the coordinates of every cell to the function getAdjacentMines().
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            currentCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
            currentCell.adjacentMines = getAdjacentMines(rowIndex, cellIndex);
        }
    }
}

// Counts the number of mines around the recieved coordinates
// and puts it in the correct cell object.
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



// Makes an array with true/false to represent the mines.
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

//Shuffles the array.
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