let diceList = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

let thrownDices = [0, 0, 0, 0, 0];
throwCounter = 0;
function throwDices(){
    document.getElementById('theButton').innerHTML = "Throw Dices";

    if(throwCounter === 1){
        if(someSelected()){
            rerollSelected();
        }
        else{
            rerollAll();
            throwCounter = 3;
        }
        showDices();
    }

    else if(throwCounter === 2){
        if(someSelected()){
            rerollSelected();
            showUnclickableDices();
        }
        else{
            rerollAll()
            showDices();
            throwCounter = 3;
        }
    }

    else{
        rerollAll();
        showDices();
    }

    throwCounter += 1
    if(throwCounter > 3){
        throwCounter = 1;
    }
    console.log('Next is throw nr: ' + throwCounter);
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

showDices(thrownDices)

function showDices(){
    let diceRolls = '';
    for(i=0; i<5; i++){
        diceRolls += `<div id="dice${i}"
        class="dice"
        onclick="selectDice(this)">
        ${diceList[thrownDices[i]]}
        </div>`;
    }
    document.getElementById('thrownDices').innerHTML = diceRolls;
}

function showUnclickableDices(){
    let diceRolls = '';
    for(i=0; i<5; i++){
        diceRolls += `<div id="dice${i}"
        class="dice"
        style="color:gray;">
        ${diceList[thrownDices[i]]}
        </div>`;
    }
    document.getElementById('thrownDices').innerHTML = diceRolls;
}


function selectDice(element){
    element.classList.toggle('highlighted');
    let button = document.getElementById('theButton');
    if(someSelected()){
        button.innerHTML = 'Reroll Selected';
    }
    else{
        button.innerHTML = 'Reroll All';
    }
}