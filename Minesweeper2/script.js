let mineFieldModel;
let mineFieldView = document.getElementById('mineField');
let totalMines = 10;
let size = {
    width: 9,
    height: 9
};
let unopenedEmptyCells = size.width*size.height - totalMines;
let availableFlags = totalMines;
let flagMode = false;
let result = '';
let difficulty = 'easy';

let highscores = {
    easy: [],
    medium: [],
    hard: []
};
let scoresHtml;
let highscoreTable = document.getElementById('highscoreTable');

init(size);
showMineField();
showHighscores();

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
                    viewCell.classList.add('x' + modelCell.adjacentMines);
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
                if(result===''){
                    viewCell.addEventListener("click", clickedSquare, false);
                }
            }
        }
    }

    let flagDiv = document.getElementById('flagBox');
    flagMode ? flagDiv.classList.add('redBorder') : flagDiv.classList.remove('redBorder');
    
    document.getElementById('flagCounter').innerHTML = availableFlags;

    let resultText = document.getElementById('resultDiv')
    if(result==='youWon'){
        resultText.innerHTML = `Congratulations! You won!<br/>Your time was <strong>${passedTime}</strong>.`;
    }
    else if(result==='youLost'){
        resultText.innerHTML = 'Sorry, you lost.';
    }
    else{
        resultText.innerHTML = '';
    }
}


function showHighscores(){
    scoresHtml = `
    <tr>
        <th><strong>Highscores ${difficulty}:<strong></th>
    </tr>`;

    if(difficulty === 'easy'){
        highscores.easy.forEach(createScoreRow);
    }
    else if(difficulty === 'medium'){
        highscores.medium.forEach(createScoreRow);
    }
    else if(difficulty === 'hard'){
        highscores.hard.forEach(createScoreRow);
    }

    highscoreTable.innerHTML = scoresHtml;
}

function createScoreRow(score){
    scoresHtml += `
        <tr>
            <td>${score}</td>
        <tr>
        `;
}


let timer; // Variable containing the setInterval() function with timerUpdate()
let passedTime;
let startTime;
function timerUpdate(){
    let currentTime = new Date;
    passedTime = (currentTime - startTime)/1000;

    let output = Math.floor(passedTime + 0.001);
    output = ('00' + output).slice(-3);
    document.getElementById('timer').innerHTML = output;
    //console.log(output);
}

// Resets some variables, sets new values to others, and draws the board again.
function setDifficulty(newHeight, newWidth, newTotalMines, selectedDifficulty){
    difficulty = selectedDifficulty;
    size.height = newHeight;
    size.width = newWidth;
    totalMines = newTotalMines;
    unopenedEmptyCells = size.width*size.height - totalMines;
    availableFlags = totalMines;
    flagMode = false;
    firstClick = true;
    result = '';
    // Stop and reset timer /////////////////////////////////////////////////////////////////////////////////////////////////
    clearInterval(timer);
    document.getElementById('timer').innerHTML = '000';
    init(size);
    showMineField();
    showHighscores();
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

    if((flagMode || mouseClick.ctrlKey) && !firstClick){
        modelCell.hasFlag = !modelCell.hasFlag;
        modelCell.hasFlag ? availableFlags-- : availableFlags ++;
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
            return;
        }
        firstClick = false;
        startTime = new Date();
        timer = setInterval(timerUpdate, 1000);
        //Start timer/////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    if(modelCell.hasFlag){return;}
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
    if(modelCell.isOpen){return;}
    if(!modelCell.hasMine){unopenedEmptyCells--;}
    modelCell.isOpen = true;
    //console.log(unopenedEmptyCells);

    if(unopenedEmptyCells === 0 || modelCell.hasMine){
        endTheGame(modelCell.hasMine);
        return;
    }

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


// Sets the conditions to stop the game.
// Runs if a mine is opened, or if every non-mine field is opened.
function endTheGame(clickedCellHadMine){
    if(clickedCellHadMine){
        result = 'youLost';
        openAllMines();
    }
    else{
        result = 'youWon';
        timerUpdate();
        passedTime = passedTime.toFixed(3);
        highscoresUpdate();
    }
    clearInterval(timer);
    //Stop timer//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


// Puts the lates time in the highscore table.
function highscoresUpdate(){
    if(difficulty === 'easy'){
        highscores.easy.push(passedTime);
        highscores.easy.sort(function(a, b){return a - b});
    }
    else if(difficulty === 'medium'){
        highscores.medium.push(passedTime);
        highscores.medium.sort(function(a, b){return a - b});
    }
    else if(difficulty === 'hard'){
        highscores.hard.push(passedTime);
        highscores.hard.sort(function(a, b){return a - b});
    }
    showHighscores();
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

// Opens every mine. Only runs if a mine is opened.
function openAllMines(){
    for(rowIndex=0; rowIndex<size.height; rowIndex++){
        for(cellIndex=0; cellIndex<size.width; cellIndex++){
            currentCell = mineFieldModel.rows[rowIndex].cells[cellIndex];
            if(currentCell.hasMine){
                currentCell.isOpen = true;
            }
        }
    }
}


// Makes an array with true/false to represent the mines.
function generateMines(){
    boardSize = size.height * size.width;
    mineArray = [];
    for(i=0; i<boardSize; i++){
        i < totalMines ? mineArray.push(true) : mineArray.push(false);
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