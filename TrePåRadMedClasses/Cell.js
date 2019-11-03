class Cell{
    constructor(index){
        this._content = '';
        this._index = index;
        this._firstInRow = index %3 == 0;
    }

    setX(){
        this._content = 'X';
    }

    setO(){
        this._content = 'O';
    }

    getCellData(){
        return({
            content: this._content,
            index: this._index,
            firstInRow: this._firstInRow
        })
    }
}