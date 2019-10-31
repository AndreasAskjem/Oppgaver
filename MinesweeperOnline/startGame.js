let gameHtml = `
<div id="game">
    <h1>Minesweeper</h1>

    <button type="button" onclick="setDifficulty(9, 9, 10, 'easy')">Easy</button>
    <button type="button" onclick="setDifficulty(16, 16, 40, 'medium')">Medium</button>
    <button type="button" onclick="setDifficulty(16, 30, 99, 'hard')">Hard</button>
    <br/><br/>

    <div
        id="flagCounter"
        class="square">0
    </div>
    <div
        id="flagBox"
        class="square gray"
        onclick="toggleFlagMode()">🚩
    </div>
    <div id="timer">000</div>
    <br/><br/><br/>

    <table id="mineField"></table>
    <div id="resultDiv" style="font-size:25px"></div>
</div>
<div id="highscores">
    <table id="highscoreTable">
        <tr><td>Loading Highscores...</td></td>
    </table>
</div>
<script src="script.js"></script>`


let nameInput = document.getElementById('nameInput');
nameInput.focus();
let name;
function setName(){
    name = nameInput.value;
    if(name.length > 10){
        alert('Please pick a nickname at 10 characters or shorter');
        nameInput.value = '';
        nameInput.focus();
        return;
    }
    if(name === ''){
        name = 'Anonymous';
    }
    document.getElementById('wrapper').innerHTML = gameHtml;

    init(size);
    showMineField();
    gameIsLoaded = true;
    if(dataIsLoaded){
        showHighscores();
    }
}