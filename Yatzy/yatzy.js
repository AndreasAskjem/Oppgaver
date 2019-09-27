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