totalBombs = 10;

let size = {
    width: 10,
    height: 10
}

let square = {
    isOpen: false,
    hasBomb: false,
    adjacentBombs: 0
}
let row = Array(size.width).fill(square);
let minefield = Array(size.height).fill(row);

makeTable()
function makeTable(){
    let mineField = document.getElementById('mineField');
    console.log(mineField.innerHTML);
    let row;
    let mineFieldHTML;
    for(i=0; i<size.height; i++){
        row = '';
        for(j=0; j<size.width; j++){
            row = `<td></td>`;
        }
        mineFieldHTML += `<tr>${row}</tr>`;
    }
    mineField.innerHTML = mineFieldHTML;
}



firstClick = true;
function openSquare(){
    if(firstClick){
        makeStuff();
        firstClick = false;
    }

    showTheSquareAndStuff();
}

function showMineField(){
    
}