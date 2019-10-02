function easy(){
    createGridHTML(8, 8, 10);
}

function medium(){
    createGridHTML(16, 16, 40);
}

function hard(){
    createGridHTML(30, 16, 99);
}

let gridData = [];

function createGridData(columns, rows, mines){
    let gridRow;
    //let gridData = [];
    for(row=0; row<rows; row++){
        gridRow = [];
        for(column=0; column<columns; column++){
            console.log('c:' + column + ', r: ' + row);
            gridRow.push(createSquareData(column, row));
        }
        gridData.push(gridRow);
    }

    minePlacements = getMinePlacements(columns, rows, mines);
}

function createSquareData(column, row){
    square = {
        column: column,
        row: row,
        hasMine: false,
        adjacentMines: 0
    };
    return(square);
}

function getMinePlacements(columns, rows, mines){
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
    console.log(row + ' ' + column)
}