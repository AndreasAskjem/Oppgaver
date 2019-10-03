function easy(){
    createGridHTML(9, 9, 10);
    createGridData(9, 9, 10);
}

function medium(){
    createGridHTML(16, 16, 40);
}

function hard(){
    createGridHTML(30, 16, 99);
}

let gridData = [];

function createGridData(columns, rows, mines){

    mineList = getMineList(columns, rows, mines);
    mineCoordinates = getMineCoordinates(columns, rows, mineList);
    //adjacentMines = getAdjacentMines(columns, rows, mineCoordinates);
    console.log(mineCoordinates);

    let gridRow;
    //let mineCount = 0;
    for(row=0; row<rows; row++){
        gridRow = [];
        for(column=0; column<columns; column++){
            //console.log('c:' + column + ', r: ' + row);
            gridRow.push(createSquareData(column, row, mineCoordinates[column][row]));
            //mineCount++;
        }
        gridData.push(gridRow);
    }
    adjacentMines = getAdjacentMines(columns, rows, mineCoordinates);
}

function createSquareData(column, row, mine){
    square = {
        column: column,
        row: row,
        hasMine: mine,
        adjacentMines: 0
    };
    return(square);
}

function getMineList(columns, rows, mines){
    let size = columns*rows;
    let mineArray = []

    // Creates array with the correct number of mines first.
    for(i=0; i<size; i++){
        if(i<mines){
            mineArray.push(true);
        }
        else{
            mineArray.push(false);
        }
    }
    console.log(mineArray);

    let shuffledMines = [];
    let temp;

    // Shuffles the mines 
    for(i=size; i>0; i--){
        randomSquare = Math.floor(Math.random() * i);
        temp = mineArray.splice(randomSquare, 1);
        shuffledMines.push(temp[0]);
    }
    console.log(shuffledMines);
    return(shuffledMines);
}

function getMineCoordinates(columns, rows, mineList){
    let mineCount = 0;
    let mineRow = [];
    let mineCoordinates = [];
    for(row=0; row<rows; row++){
        mineRow = [];
        for(column=0; column<columns; column++){
            mineRow.push(mineList[mineCount]);
            mineCount++;
        }
        mineCoordinates.push(mineRow);
    }
    return(mineCoordinates);
}

function getAdjacentMines(columns, rows, mineCoordinates){
    let adjacentMines;
    for(row=0; row<rows; row++){
        for(column=0; column<columns; column++){
            adjacentMines = checkSuroundingSquares(column, row, mineCoordinates)
            console.log(adjacentMines);
            gridData[column][row].adjacentMines = adjacentMines;
        }
    }
}

function checkSuroundingSquares(column, row, mineCoordinates){
    let adjacentMines = 0;
    for(i=-1; i<2; i++){
        for(j=-1; j<2; j++){
            try{
                if(gridData[column+i][row+j].hasMine){
                    adjacentMines++;
                }
            }
            catch{}
        }
    }
    return(adjacentMines)
}




function createSquareHTML(column, row, firstInRow){
    let clearLeft = '';
    if(firstInRow){
        clearLeft = 'clearLeft';
    }
    squareHTML = `<div id="c${column}r${row}" onclick="openSquare(this, ${column}, ${row})" class="gray square ${clearLeft}"></div>`;
    return(squareHTML)
}

function createGridHTML(columns, rows, mines){
    let gridHTML = '';
    for(row=0; row<rows; row++){
        for(column=0; column<columns; column++){
            let firstInRow;
            column === 0 ? firstInRow=true : firstInRow=false;

            gridHTML += createSquareHTML(column, row, firstInRow);
        }
    }
    document.getElementById('mainContent').innerHTML = gridHTML;
    return(gridHTML);
}

function openSquare(element, column, row){
    console.log(element);
    console.log(row + ' ' + column);
    console.log(gridData[column][row].hasMine);
    if(gridData[column][row].hasMine){
        element.innerHTML = '💣';
    }
    else{
        element.innerHTML = gridData[column][row].adjacentMines;
    }
}