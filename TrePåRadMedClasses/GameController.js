class GameController{
    constructor(game){
        this._game = game;
    }

    setX(index){
        this._game.setX(index);
        updateView();
        console.log(index);
    }
}