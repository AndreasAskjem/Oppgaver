//document.write('hello');

generatelabyrinth(5);
function generatelabyrinth(size){
    let labyrinth = `<table>
    `;
    let labyrinthRow = ``;

    for(i=0; i<size; i++){
        labyrinthRow += `<tr>
        `;
        //row without rooms
        for(j=0; j<size; j++){
            if(i===0){
                labyrinthRow += `<td class="wall small"></td>
                <td class="wall wide"></td>
                `;
            }
            else{
                labyrinthRow += `<td class="wall small"></td>
                <td class="${Math.random() < 0.5 ? 'wall' : 'noWall'} wide"></td>
                `;
            }
        }
        labyrinthRow += `<td class="wall small"></td>
        </tr>
        <tr>
        `;

        //row with rooms
        for(j=0; j<=size; j++){
            if(j===0){
                labyrinthRow += `<td class="wall high"></td>
                <td class="room"></td>
                `;
            }
            else if(i===(size)){
                labyrinthRow += `<td class="wall small"></td>
                <td class="wall wide"></td>
                `;
            }
            else{
                labyrinthRow += `<td class="${Math.random() < 0.5 ? 'wall' : 'noWall'} high"></td>
                <td class="room"></td>
                `;
            }
        }
        
        labyrinthRow += `<td class="wall high"></td>
        </tr>
        `;
        
        labyrinth += labyrinthRow;
        labyrinthRow = ``;
    }
    labyrinth += `</table>`;

    //console.log(labyrinth);
    document.write(labyrinth);
    
}



x=`<table>
    <tr>
        <td class="wall small"></td>
        <td class="wall wide"></td>
        <td class="wall small"></td>
        <td class="wall wide"></td>
        <td class="wall small"></td>
    </tr>
    <tr>
        <td class="wall high"></td>
        <td class="room"></td>
        <td class="wall high"></td>
        <td class="room"></td>
        <td class="wall high"></td>
    </tr>
    <tr>
        <td class="wall small"></td>
        <td class="wall wide"></td>
        <td class="wall small"></td>
        <td class="wall wide"></td>
        <td class="wall small"></td>
    </tr>
    <tr>
        <td class="wall high"></td>
        <td class="room"></td>
        <td class="wall high"></td>
        <td class="room"></td>
        <td class="wall high"></td>
    </tr>
    <tr>
        <td class="wall small"></td>
        <td class="wall wide"></td>
        <td class="wall small"></td>
        <td class="wall wide"></td>
        <td class="wall small"></td>
    </tr>
</table>`

//document.write(x);