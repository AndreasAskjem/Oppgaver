let mazeView = document.getElementById('theTable');
let mazeModel = {rows: []}
size1 = 10;
size2 = size1*2 + 1;
init(size2);
console.log();
makeEntranceAndExit();
showMaze();

function init(){
    mazeModel = {};
    mazeModel.rows = [];
    for(rowIndex = 0; rowIndex < size2; rowIndex++){
        let newRow = {};
        newRow.cells = [];
        for(cellIndex = 0; cellIndex < size2; cellIndex++){
            let newCell = {};
            let visibility = 0.5 < Math.random() ? true : false;

            newCell.roomOrWall = 'wall'
            newCell.visible = true;
            newCell.toggle = true;
            if(rowIndex%2 === 0 && cellIndex%2 === 0){
                newCell.type = 'small';
                newCell.toggle = false;
            }
            else if(rowIndex === 0 || rowIndex === size2-1){
                newCell.type = 'long';
            }
            else if(cellIndex === 0 || cellIndex === size2-1){
                newCell.type = 'tall';
            }
            else if(rowIndex%2 === 0){
                newCell.type = 'long';
                newCell.visible = visibility;
            }
            else if(cellIndex%2 === 0){
                newCell.type = 'tall';
                newCell.visible = visibility;
            }
            else{
                newCell.roomOrWall = 'room';
                newCell.type = 'room';
                newCell.toggle = false;
            }
            newRow.cells.push(newCell);
        }
        mazeModel.rows.push(newRow);
    }
}

function makeEntranceAndExit(){
    opening = Math.floor(Math.random()*size1+1)*2-1;
    exit = Math.floor(Math.random()*size1+1)*2-1;
    // Top/bottom entrances
    if(0.5 < Math.random()){
        mazeModel.rows[0].cells[opening].visible = false;
        mazeModel.rows[size2-1].cells[exit].visible = false;
    }
    // Left/right entrances
    else{
        mazeModel.rows[opening].cells[0].visible = false;
        mazeModel.rows[exit].cells[size2-1].visible = false;
    }
}

function showMaze(){
    mazeView.innerHTML = '';

    for(rowIndex = 0; rowIndex < size2; rowIndex++){
        let viewRow = mazeView.insertRow();
        let modelRow = mazeModel.rows[rowIndex];
        for(cellIndex = 0; cellIndex < size2; cellIndex++){
            let viewCell = viewRow.insertCell();
            let modelCell = modelRow.cells[cellIndex];
            viewCell.classList.add(modelCell.type);
            if(!modelCell.visible){
                viewCell.classList.add('noWall');
            }
            else if(modelCell.roomOrWall === 'wall'){
                viewCell.classList.add('wall');
            }
            if(modelCell.toggle){
                viewCell.addEventListener("click", clickedWall, false);
            }
        }
    }
}


function clickedWall(mouseClick){
    let rowIndex = mouseClick.srcElement.parentElement.sectionRowIndex;
    let cellIndex = mouseClick.srcElement.cellIndex;
    let modelCell = mazeModel.rows[rowIndex].cells[cellIndex];

    modelCell.visible = !modelCell.visible;
    showMaze();
}