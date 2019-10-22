let tasks = [
    {description: 'Handle til middag', isDone: true, person: 'Bob'},
    {description: 'Lage middag', isDone: false, person: ''}
]


let taskDescriptionInput = document.getElementById("taskDescription");
let taskPersonInput = document.getElementById('taskPerson');
let taskDeadlineInput = document.getElementById('taskDeadline');
function addTask(){
    const newTaskDescription = taskDescriptionInput.value;
    const newPerson = taskPersonInput.value;
    const newDeadline = taskDeadlineInput.value;//.toISOString().substr(0,10);

    console.log(newDeadline);

    let newTask = {
        description: newTaskDescription,
        isDone: false,
        person: newPerson,
        deadline: newDeadline,
        doneDate: ''
    };
    tasks.push(newTask);
    show();
    taskDescriptionInput.value = '';
    taskPersonInput.value = '';
    taskDeadlineInput.value = '';
    taskDescriptionInput.focus();
}

taskDescriptionInput.focus();
let tasksTable = document.getElementById('tasksTable');
show();
function show(){
    tasksTable.innerHTML = '';
    let tableHTML = `
        <tr>
            <th>Oppgave</th>
            <th>Person</th>
            <th>Frist</th>
            <th>Gjort dato</th>
            <th>Gjort</th>
            <th></th>
        </tr>`;

    //let rowHTML = `<tr>`;

    for(let i=0; i<tasks.length; i++){
        tableHTML += createHtmlRow(i);
    }
    tasksTable.innerHTML = tableHTML;
}

function createHtmlRow(i){
    const task = tasks[i];
    const checkedHTML = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode) {
        return `
            <tr>
                <td>${task.description}</td>
                <td>${task.person}</td>
                <td>${task.deadline}</td>
                <td>${task.doneDate}</td>
                <td><input type="checkbox" ${checkedHTML} onchange="changeIsDone(this, ${i})"/></td>
                <td>
                    <button onclick="deleteTask(${i})">Slett</button>
                    <button onclick="editTask(${i})">Endre</button>
                </td>
            </tr>
            `;
    }
    return `
        <tr>
            <td><input class="tableEdit" id="editDescription${i}" type="text" value="${task.description}"></td>
            <td><input class="tableEdit" id="editPerson${i}" type="text" value="${task.person}"></td>
            <td><input class="tableEdit" id="editDate${i}" type="date"/></td>
            <td>${task.doneDate}</td>
            <td><input type="checkbox" ${checkedHTML} onchange="changeIsDone(this, ${i})"/></td>
            <td>
                <button onclick="updateTask(${i})">Lagre</button>
            </td>
        </tr>
        `;
    
}

function changeIsDone(checkbox, index){
    task = tasks[index];

    task.isDone = checkbox.checked;

    let currentDate = new Date().toISOString().substr(0,10);
    task.doneDate = task.isDone ? currentDate : '';
    show();
}

function deleteTask(index){
    tasks.splice(index, 1);
    show();
}
function editTask(index){
    tasks[index].editMode = !tasks[index].editMode;
    show();
}

function updateTask(index){
    const task = tasks[index]

    const descriptionId = `editDescription${index}`;
    const inputTag = document.getElementById(descriptionId);
    task.description = inputTag.value;

    const personId = `editPerson${index}`;
    const inputPerson = document.getElementById(personId);
    task.person = inputPerson.value;

    const dateId = `editDate${index}`;
    const inputDate = document.getElementById(dateId);
    task.deadline = inputDate.value;

    tasks[index].editMode = false;
    show();
}