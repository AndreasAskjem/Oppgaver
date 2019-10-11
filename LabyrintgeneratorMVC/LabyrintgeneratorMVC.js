let mazeView = document.getElementById('theTable');
let mazeModel = {
    size: 12,
    rows: []
}
size = mazeModel.size*2 + 1;
init(size);
showMaze();

function init(){
    mazeModel = {};
    mazeModel.rows = []
    for(rowIndex = 0; rowIndex < size; rowIndex++){
        let newRow = {};
        newRow.cells = [];
        for(cellIndex = 0; cellIndex < size; cellIndex++){
            let newCell = {};
            let visibility = 0.5 < Math.random() ? true : false;

            newCell.roomOrWall = 'wall'
            newCell.visible = true;
            newCell.toggle = true;
            if(rowIndex%2 === 0 && cellIndex%2 === 0){
                newCell.type = 'small';
                newCell.toggle = false;
            }
            else if(rowIndex === 0 || rowIndex === size-1){
                newCell.type = 'long';
            }
            else if(cellIndex === 0 || cellIndex === size-1){
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

function showMaze(){
    mazeView.innerHTML = '';

    for(rowIndex = 0; rowIndex < size; rowIndex++){
        let viewRow = mazeView.insertRow();
        let modelRow = mazeModel.rows[rowIndex];
        for(cellIndex = 0; cellIndex < size; cellIndex++){
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