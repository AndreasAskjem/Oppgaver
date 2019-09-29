// Saves names as objects before replacing the HTML of the page with the game.
//////////////////////////////////////////////////////////////////////////////
let playerList = []
function nameIsSubmitted(){
    let submittedName = document.getElementById('username').value;
    document.getElementById('username').value = '';

    playerList.push({
        name: submittedName,
        scores: ['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;'],
        sum: 0
    })
    console.log(submittedName);
}

function changeHTML(){
    
    if(playerList.length > 0){
        document.getElementById('mainContent').innerHTML = `
    <button type="button" id="theButton" onclick="throwDices()">Throw Dices</button>
    <button type="button" id="submitButton" onclick="submitDices()">Submit Dices</button>
    <div id="thrownDices"></div>
    <br/><br/><br/><br/>
    <div id="scoreTableDiv"></div>
    `;

        createTable()
    }
    else{alert("You can't play without any players!");}
}




// The main game.
//////////////////////////////////////////////////////////////////////////////
let diceList = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

let thrownDices = [0, 0, 0, 0, 0];
throwCounter = 0;
function throwDices(){
    document.getElementById('theButton').innerHTML = "Reroll Selected"
    if(throwCounter === 1){
        rerollSelected();
        makeDiceElements(true);
    }

    else if(throwCounter === 2){
        rerollSelected();
        makeDiceElements(false);
        document.getElementById('theButton').disabled = true;
    }

    else{
        rerollAll();
        makeDiceElements(true);
    }

    document.getElementById('theButton').disabled = true;
    throwCounter+=1;
    console.log('This was throw nr: ' + throwCounter);
}

function submitDices(){
    document.getElementById('theButton').innerHTML = "Throw Dices";
    document.getElementById('theButton').disabled = false;
    document.getElementById('thrownDices').innerHTML = ''
    addScore();
    createTable();
    throwCounter = 0;
}


function rerollAll(){
    for(i=0; i<5; i++){
        let randomDice = Math.floor(Math.random()*6);
        thrownDices[i] = randomDice;
    }
}

function rerollSelected(){
    for(i=0; i<5; i++){
        if(document.getElementById(`dice${i}`).classList.contains('highlighted')){
            let randomDice = Math.floor(Math.random()*6);
            thrownDices[i] = randomDice;
        }
    }
}


function makeDiceElements(addOnClick){
    let diceRolls = '';
    let x = '';
    if(addOnClick){
        x = `onclick="selectDice(this)"`
    }
    else{
        x = `style="color: gray;"`;
    }

    for(i=0; i<5; i++){
        diceRolls += `<div id="dice${i}"
        class="dice"
        ${x}>
        ${diceList[thrownDices[i]]}
        </div>`;
    }
    showDices(diceRolls);    
}


function showDices(diceRolls){
    document.getElementById('thrownDices').innerHTML = diceRolls;
}


function selectDice(element){
    element.classList.toggle('highlighted');
    let button = document.getElementById('theButton');
    if(someSelected()){
        document.getElementById('theButton').disabled = false;
        button.innerHTML = 'Reroll Selected';
    }
    else{
        document.getElementById('theButton').disabled = true;
        console.log('BBBBBBB')

    }
}

function someSelected(){
    let numberOfSelected = 0;
    for(i=0; i<5; i++){
        if(document.getElementById(`dice${i}`).classList.contains('highlighted')){
            numberOfSelected++;
        }
    }
    return(numberOfSelected > 0 ? true : false);
}




//createTable();
function createTable(){

    let tableHTML = `
    <table id="leftColumn">
        <tr>
            <th>&nbsp;</th>
        </tr>
        <tr>
            <td>One</td>
        </tr>
        <tr>
            <td>Two</td>
        </tr>
        <tr>
            <td>Three</td>
        </tr>
        <tr>
            <td>Four</td>
        </tr>
        <tr>
            <td>Five</td>
        </tr>
        <tr>
            <td>Six</td>
        </tr>
        <tr>
            <td>Total</td>
        </tr>
    </table>
    `;



    tableHTML += `
    <table id="scoreTable">
        <tr>
    `;
    for(player in playerList){
        tableHTML += `<th>${playerList[player].name}</th>
        `;
    }
    tableHTML += `</tr>
    `
    for(i=0; i<6; i++){
        tableHTML += `<tr>
        `;
        for(j=0; j< playerList.length; j++){
            tableHTML += `<td>${playerList[j].scores[i]}</td>`;
        }
        tableHTML += `</tr>
        `;
    }


    tableHTML += `<tr>
    `;
    for(i=0; i< playerList.length; i++){
        tableHTML += `<td>${playerList[i].sum}</td>`;
    }
    tableHTML += `</tr>
    `;


    tableHTML += `</table>`;
    console.log(tableHTML);
    document.getElementById('scoreTableDiv').innerHTML = tableHTML;
}

let playerNumber = 0;
let roundNumber = 0;

function addScore(){
    playerList[playerNumber].scores[roundNumber] = findRoundScore();
    playerList[playerNumber].sum += findRoundScore();
    
    playerNumber += 1;

    if(playerNumber > playerList.length-1){
        playerNumber = 0;
        roundNumber +=1;
    }
    if(roundNumber == playerList.length){
        playerSum = 0;

        playerList[playerNumber].scores[6] = 5;
    }
}

function findRoundScore(){
    let roundScore = 0;
    for(i in thrownDices){
        if(thrownDices[i] == roundNumber){
            roundScore += 1;
        }
    }
    roundScore *= (roundNumber + 1);
    return(roundScore);
}