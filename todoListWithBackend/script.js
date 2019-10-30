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
let tableRef = db.collection('todoTable');

let tasks = [];

tableRef.onSnapshot(function(){
    getData();
});

async function getData(){
    try{
        let todoDoc = await tableRef.orderBy('deadline').get();
        tasks = todoDoc.docs.map(docsToObjects);
        show();
    }
    catch(error){
        console.error(error);
    }
}

function docsToObjects(element){
    let task = element.data()
    task.id = element.id;
    task.editMode = false;
    return(task);
}


function show(){
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

    for(let i=0; i<tasks.length; i++){
        tableHTML += createHtmlRow(i);
    }
    document.getElementById('tasksTable').innerHTML = tableHTML;
}

function createHtmlRow(i){
    let task = tasks[i];
    let id= task.id;
    const checkedHTML = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode) {
        return `
            <tr>
                <td>${task.description}</td>
                <td>${task.person}</td>
                <td>${task.deadline}</td>
                <td>${task.doneDate}</td>
                <td><input id="${id}" type="checkbox" ${checkedHTML} onchange="changeIsDone(this)"/></td>
                <td>
                    <button id="${id}" onclick="deleteTask(this)">Slett</button>
                    <button id="${id}" onclick="editTask(this)">Endre</button>
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
            <td><input id="${id}" type="checkbox" ${checkedHTML} onchange="changeIsDone(this)"/></td>
            <td>
                <button id="${id}" onclick="updateTask(this)">Lagre</button>
            </td>
        </tr>
        `;
}



let taskDescriptionInput = document.getElementById("taskDescription");
let taskPersonInput = document.getElementById('taskPerson');
let taskDeadlineInput = document.getElementById('taskDeadline');
function addTask(){
    const newTaskDescription = taskDescriptionInput.value;
    const newPerson = taskPersonInput.value;
    const newDeadline = taskDeadlineInput.value;

    let newTask = {
        description: newTaskDescription,
        isDone: false,
        person: newPerson,
        deadline: newDeadline,
        doneDate: ''
    };
    tableRef.add(newTask);
    
    taskDescriptionInput.value = '';
    taskPersonInput.value = '';
    taskDeadlineInput.value = '';
}


function changeIsDone(checkbox){
    let id = checkbox.id;
    let doneDate = new Date().toISOString().substr(0,10);
    let task = tasks.filter(t => t.id === id)[0];

    doneDate = task.isDone ? '' : doneDate;
    
    tableRef.doc(id).set({
        isDone: !task.isDone,
        doneDate: doneDate},
        {merge: true}
    );
}

function deleteTask(element){
    tableRef.doc(element.id).delete()
}

//Turns on edit mode
function editTask(element){
    let index = tasks.map(t => t.id).indexOf(element.id);
    tasks[index].editMode = !tasks[index].editMode;
    show();
}

//Adds new document to the database
function updateTask(element){
    let id = element.id;
    let updatedTask = {};

    const inputTag = document.getElementById(`editDescription${id}`);
    updatedTask.description = inputTag.value;

    const inputPerson = document.getElementById(`editPerson${id}`);
    updatedTask.person = inputPerson.value;

    const inputDate = document.getElementById(`editDate${id}`);
    updatedTask.deadline = inputDate.value;

    tableRef.doc(id).set(updatedTask, {merge: true});
}