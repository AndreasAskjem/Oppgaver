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

tableRef.orderBy('deadline').onSnapshot(
    function(collectionSnapshot){
        docList = collectionSnapshot;
        tasks = [];

        for(let i=0; i<collectionSnapshot.docs.length; i++){
            let taskId = collectionSnapshot.docs[i].id;
            let task = collectionSnapshot.docs[i].data();
            
            tasks.push(
                {
                    description: task.description,
                    person:      task.person,
                    deadline:    task.deadline,
                    doneDate:    task.doneDate,
                    isDone:      task.isDone,
                    id:          taskId,
                    editMode:    false
                }
            )
        }
        show();
    }
)


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

    for(i in tasks){
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
    const newDeadline = taskDeadlineInput.value;//.toISOString().substr(0,10);

    let newTask = {
        description: newTaskDescription,
        isDone: false,
        person: newPerson,
        deadline: newDeadline,
        //doneDate: ''
    };
    tableRef.add(newTask);
    
    taskDescriptionInput.value = '';
    taskPersonInput.value = '';
    taskDeadlineInput.value = '';
    taskDescriptionInput.focus();
}


function changeIsDone(checkbox){
    let id = checkbox.id;

    let doneDate = new Date().toISOString().substr(0,10);

    for(i in tasks){
        if(id === tasks[i].id){
            if(tasks[i].isDone){
                tableRef.doc(id).set({
                    isDone: false,
                    doneDate: ''
                }, {merge: true});
            }
            else{
                tableRef.doc(id).set({
                    isDone: true,
                    doneDate: doneDate
                }, {merge: true});
            }
        }
    }
}

function deleteTask(element){
    tasks.forEach(
        function(task){
            if(element.id == task.id){
                tableRef.doc(`${task.id}`).delete();
            }
        }
    );
}

//Turns on edit mode
function editTask(element){
    for(i in tasks){
        if(element.id === tasks[i].id){
            tasks[i].editMode = !tasks[i].editMode;
        }
    }
    show();
}


function updateTask(element){
    let id = element.id;
    let updatedTask = {};

    const descriptionId = `editDescription${id}`;
    const inputTag = document.getElementById(descriptionId);
    updatedTask.description = inputTag.value;

    const personId = `editPerson${id}`;
    const inputPerson = document.getElementById(personId);
    updatedTask.person = inputPerson.value;

    const dateId = `editDate${id}`;
    const inputDate = document.getElementById(dateId);
    updatedTask.deadline = inputDate.value;

    tasks.forEach(
        function(task){
            if(id == task.id){
                tableRef.doc(id).set(updatedTask, {merge: true});
            }
        }
    );
    
    show();
}