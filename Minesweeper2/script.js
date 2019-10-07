
let mineFieldView = document.getElementById('mineField');
//console.log(mineFieldView.innerHTML);

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
let mineField = Array(size.height).fill(row);

//mineField[0][3].hasBomb = true;

makeTable()
function makeTable(){
    console.log(mineField);
    let row;
    let mineFieldHTML;
    for(i=0; i<size.height; i++){
        let viewRow = mineFieldView.insertRow();
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