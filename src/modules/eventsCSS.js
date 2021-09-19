import { createProject, editTask, getProjectList, saveProjectList } from "./storage";
import { display, displayTask, getTodayFormatOfInput, updateProjectDom } from "./display";
import { totalTaskEvenControl } from "..";

export function getIdOfCurrentProject(){
    const ctn = document.querySelector('.project');
    const projectListDom = ctn.querySelectorAll('div');
    
    let projectListArray = Array.prototype.slice.call(projectListDom);
    
    for (let i = 0; i<projectListArray.length; i++){
        if (projectListArray[i].classList.contains('active')) return i;
    }
}
export function removeActive(){
    const project_ctn = document.querySelector('.project');
    const prcts = project_ctn.querySelectorAll('div');
    let arrayList = Array.prototype.slice.call(prcts);
    for (let i = 0; i<arrayList.length; i++){
        arrayList[i].classList.remove('active');
    }
}
export function addActiveToTheNewest(){
    const project_ctn = document.querySelector('.project');
    const prcts = project_ctn.querySelectorAll('div');
    let arrayList = Array.prototype.slice.call(prcts);
    
    arrayList[arrayList.length-1].classList.add('active');
}
export function addActive(object){
    object.classList.add('active');
}

export function createProjectPopUp(){
    const ctn = document.createElement('div');
    ctn.classList.add('projectPopUp');
    const h3 = document.createElement('h3');
    h3.innerHTML = 'Create new project';

    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('id', 'projectTitle');
    inputTitle.setAttribute('placeholder','Project Title');
    inputTitle.required = true;

    const inputDescription = document.createElement('input');
    inputDescription.setAttribute('type', 'text');
    inputDescription.setAttribute('id', 'projectDescription');
    inputDescription.setAttribute('placeholder','Project Description');
    //inputDescription.setAttribute('required');

    const createButton = document.createElement('button');
    createButton.innerHTML = 'Create';
    createButton.classList.add('createProject');

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('cancelProject');

    ctn.append(h3, inputTitle, inputDescription, createButton, cancelButton);
    //
    const container = document.querySelector('.projectFormPopUp');
    container.innerHTML = '';
    container.appendChild(ctn);

    container.style.display = 'none';
}

export function displayProjectPopUp(){
    const container = document.querySelector('.projectFormPopUp');
    container.style.display = "block";
}
export function removeDisplayProjectPopUp(){
    const container = document.querySelector('.projectFormPopUp');
    container.style.display = "none";
}
/// TASK POPUP BELOW

export function createTaskPopUp(){
    const ctn = document.createElement('div');
    ctn.classList.add('taskPopUp');
    const h3 = document.createElement('h3');
    h3.innerHTML = 'Create New Task';

    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('id', 'taskTitle');
    inputTitle.setAttribute('placeholder','Task Title');
    inputTitle.required = true;

    const inputDescription = document.createElement('input');
    inputDescription.setAttribute('type', 'text');
    inputDescription.setAttribute('id', 'taskDescription');
    inputDescription.setAttribute('placeholder','Task Description');
    //inputDescription.setAttribute('required');
    // input day time 
    const inputDueDay = document.createElement('input');
    inputDueDay.setAttribute('type','date')
    inputDueDay.setAttribute('id','taskDueDay');
    inputDueDay.value = getTodayFormatOfInput();
    const createButton = document.createElement('button');
    createButton.innerHTML = 'Create';
    createButton.classList.add('createTask');

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('cancelTask');
    
    ctn.append(h3,inputTitle,inputDescription, inputDueDay, createButton, cancelButton);

    const container = document.querySelector('.taskFormPopUp');
    container.innerHTML = '';
    container.appendChild(ctn);
    
    container.style.display = 'none';
}

export function displayTaskPopUp(){
    const container = document.querySelector('.taskFormPopUp');
    container.style.display = "block";
}
export function removeDisplayTaskPopUp(){
    const container = document.querySelector('.taskFormPopUp');
    container.style.display = "none";
}

// below is for edit task form pop up
export function createEditTaskFormPopUp(idOfProject, indexOfTaskInArray){
    //get information of the task we working on
    
    let projectList = getProjectList();
    let arrayTask = projectList[idOfProject].taskOfThis;

    let title = arrayTask[indexOfTaskInArray].title;
    let description = arrayTask[indexOfTaskInArray].description;
    let dueDay = arrayTask[indexOfTaskInArray].dueDay;    
    
        

    const ctn = document.createElement('div');
    ctn.classList.add('editTaskPopUp');
    const h3 = document.createElement('h3');
    h3.innerHTML = 'Edit Task';

    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('id', 'taskTitle');
    inputTitle.value = title;

    
    const inputDescription = document.createElement('input');
    inputDescription.setAttribute('type','text');
    inputDescription.setAttribute('id', 'taskDescription');
    inputDescription.value = description;
    //inputDescription.setAttribute('required');

    const inputDueDay = document.createElement('input');
    inputDueDay.setAttribute('type','date')
    inputDueDay.setAttribute('id','taskDueDay');
    inputDueDay.value = dueDay;

    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.classList.add('saveTask');

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('cancelEditTask');
        
    ctn.append(h3,inputTitle,inputDescription,inputDueDay, saveButton, cancelButton);

    const container = document.querySelector('.editTaskFormPopUp');
    container.innerHTML = '';
    container.appendChild(ctn);
    
    container.style.display = 'block';

    //event

    saveButton.addEventListener('click', function(){
        if (inputTitle == '') alert('Title required');
        else {
            title = inputTitle.value;
            description = inputDescription.value;
            dueDay = inputDueDay.value;

            editTask(idOfProject, indexOfTaskInArray, title, description, dueDay);
            
            displayTask(idOfProject);
            totalTaskEvenControl();
            removeDisplayEditTaskFormPopUp();
        }
    })

    cancelButton.addEventListener('click', function(){
        removeDisplayEditTaskFormPopUp();
    })
}

function removeDisplayEditTaskFormPopUp(){
    const ctn = document.querySelector('.editTaskFormPopUp');
    ctn.style.display = 'none';
}