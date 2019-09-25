const labyrinthSize = 10;

const room = `<td class="room"></td>`;
const smallWall = `<td class="wall small"></td>`;
const wideWall = `<td class="wall wide" onclick="toggleWall(this)"></td>`;
const tallWall = `<td class="wall high" onclick="toggleWall(this)"></td>`;
const noWideWall = `<td class="noWall wide" onclick="toggleWall(this)"></td>`;
const noTallWall = `<td class="noWall high" onclick="toggleWall(this)"></td>`;

// Puts together the rows from the other functions to make the labyrinth.
generatelabyrinth(labyrinthSize);
function generatelabyrinth(size){
    let labyrinth = `<table>`;
    labyrinth += solidRow(size);
    labyrinth += roomRow(size);

    for(i=0; i<size-1; i++){
        labyrinth += randomRow(size);
        labyrinth += roomRow(size);
    }
    labyrinth += solidRow(size);
    labyrinth += `</table>`;
    document.write(labyrinth);
}


// Makes a solid row.
function solidRow(size){
    let oneRow = `<tr>`
    for(j=0; j<size; j++){
        oneRow += smallWall + wideWall;
    }
    oneRow += smallWall + `</tr>`;
    return(oneRow);
}

// Makes a row with rooms.
function roomRow(size){
    let oneRow = `<tr>` + tallWall + room;
    for(j=0; j<size-1; j++){
        oneRow += Math.random() < 0.5 ? tallWall : noTallWall;
        oneRow += room;
    }
    oneRow += tallWall + `</tr>`;
    return(oneRow);
}

// Makes a row without rooms.
function randomRow(size){
    let oneRow = `<tr>`;
    for(j=0; j<size; j++){
        oneRow += smallWall;
        oneRow += Math.random() < 0.5 ? wideWall : noWideWall;
    }
    oneRow += smallWall + `</tr>`;
    return(oneRow);
}


// Toggles wide/tall walls between shown and not shown when clicked.
function toggleWall(wall){
    wall.classList.toggle('noWall');
    wall.classList.toggle('wall');
}