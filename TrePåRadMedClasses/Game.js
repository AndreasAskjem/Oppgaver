class Game{
    constructor(){


        this._cells = [];
        for(let i=0; i<9; i++){
            this._cells.push(new Cell(i));
        }
    }
    getCells(){
        console.log(this._cells)
        return(this._cells);
    }

    setX(index){
        this._cells[index]._data = 'X';
    }


    setO(index){
        this._cells[index]._data = 'O';
    }
}