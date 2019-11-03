class CellView{
    constructor(cell){
        this._cell = cell;
    }

    getHtml(){
        let data = this._cell.getCellData();
        let firstInRow = data.firstInRow ? 'firstInRow' : '';

        return(`
            <div
                class="cell ${firstInRow} ${data.content}"
                onclick="gameController.setX(${data.index})">
                ${data.content}
            </div>
        `);
    }
}