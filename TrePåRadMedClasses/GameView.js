class GameView{
    constructor(){
        this._div = document.getElementById('game')
    }

    show(){
        this._cellViews = [];
        let cells = game.getCells();

        for(let i in cells){
            this._cellViews.push(new CellView(cells[i]));
        }

        let divHtml = '';
        for(let i in this._cellViews){
            divHtml += this._cellViews[i].getHtml(i);
        }

        this._div.innerHTML = divHtml;
    }
}