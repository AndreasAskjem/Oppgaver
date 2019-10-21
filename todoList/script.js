let tasks = [
    {description: 'Handle til middag', isDone: true},
    {description: 'Lage middag', isDone: false}
]
show();


function addTask(){

}


let tasksTable = document.getElementById('tasksTable');
function show(){
    tasksTable.innerHTML = '';
    let tableHTML = `
        <tr>
            <th>Oppgave</th>
            <th>Gjort</th>
        </tr>`;

        let rowHTML = `<tr>`;
}

//15:30
//https://www.youtube.com/watch?v=9M67h0dqKeM

/*
    <tr>
        <th>Oppgave</th>
        <th>Gjort</th>
    </tr>
    <tr>
        <td>Handle til middag</td>
        <td><input type="checkbox" checked="checked"/></td>
    </tr>
    <tr>
        <td>Lage middag</td>
        <td><input type="checkbox"></td>
    </tr>
    */