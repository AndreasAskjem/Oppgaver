var firebaseConfig = {
    apiKey: "AIzaSyAbJmqEPuH6dtNC3V3XeUv-hj0d9RAgvE8",
    authDomain: "start-it-db2b1.firebaseapp.com",
    databaseURL: "https://start-it-db2b1.firebaseio.com",
    projectId: "start-it-db2b1",
    storageBucket: "start-it-db2b1.appspot.com",
    messagingSenderId: "724233712182",
    appId: "1:724233712182:web:2c2cfa2ab0acf04ec39e97",
    measurementId: "G-EBH6RV7CSB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();
let tableRef = db.collection('todoTable');//.doc('QhaI3RD76TqePfS1tVj5');

let tasks = [];

tableRef.orderBy('deadline').onSnapshot(
    function(collectionSnapshot){
        let tableHTML = `
            <tr>
                <th>Oppgave</th>
                <th>Person</th>
                <th>Frist</th>
                <th>Gjort dato</th>
                <th>Gjort</th>
                <th></th>
            </tr>
            `;
        docList = collectionSnapshot;
        
        tasks = [];

        for(let i=0; i<collectionSnapshot.docs.length; i++){
            let taskId = collectionSnapshot.docs[i].id;
            let task = collectionSnapshot.docs[i].data();
            

            tasks.push(
                {
                    description: task.description,
                    person:      task.person,
                    deadline:    task.deadline.toDate().toISOString().substr(0,10),
                    doneDate:    task.doneDate,
                    isDone:      task.isDone
                }
            )
            
            tableHTML += createHtmlRow(i, taskId);
        }

        document.getElementById('tasksTable').innerHTML = tableHTML;
    }
)


function createHtmlRow(i, id){
    let task = tasks[i];
    const checkedHTML = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode) {
        return `
            <tr>
                <td>${task.description}</td>
                <td>${task.person}</td>
                <td>${task.deadline}</td>
                <td>${task.doneDate}</td>
                <td><input type="checkbox" ${checkedHTML} onchange="changeIsDone(this, ${id})"/></td>
                <td>
                    <button onclick="deleteTask(${id})">Slett</button>
                    <button onclick="editTask(${id})">Endre</button>
                </td>
            </tr>
            `;
    }
    return `
        <tr>
            <td><input class="tableEdit" id="editDescription${id}" type="text" value="${task.description}"></td>
            <td><input class="tableEdit" id="editPerson${id}" type="text" value="${task.person}"></td>
            <td><input class="tableEdit" id="editDate${id}" type="date"/></td>
            <td>${task.doneDate}</td>
            <td><input type="checkbox" ${checkedHTML} onchange="changeIsDone(this, ${id})"/></td>
            <td>
                <button onclick="updateTask(${id})">Lagre</button>
            </td>
        </tr>
        `; /////////// Probably need to fix some ID stuff.
}




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

function updateTask(id){ /////// start here?
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