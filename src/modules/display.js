import editorSrc from './image/editor.png';
import deleteSrc from './image/delete.jpg';
import pencilSrc from './image/pencilIcon.png';
import { parseISO, format } from "date-fns";
import { getProjectList } from "./storage";


export function insertPencilImg(){
    const ctn = document.querySelector('.title-img');

    const img = document.createElement('img');
    img.src = pencilSrc;

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Todo Lists';
    ctn.append(img, h1);
}
export function getToday(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

export function displayTodayAtHeader(){
    // get today date

    let today = getToday();

    const ctn = document.querySelector('.today');

    const h3 = document.createElement('h3');
    h3.innerHTML = `Today is ${today}`;

    ctn.innerHTML = '';
    ctn.appendChild(h3);
}
export function display(){
    loadProject();
    displayTask(0);
}

function loadProject(){
    let projectList = getProjectList();
    const ctn = document.querySelector('.project');
    ctn.innerHTML = '';

    for (let i = 0; i<projectList.length; i++){
        let projectDiv = document.createElement('div');
        projectDiv.classList.add('projectItem');

        let p = document.createElement('p');
        p.classList.add('projectTitle');
        p.innerHTML = projectList[i].title;

        projectDiv.setAttribute('id', i);
        if (i==0) projectDiv.classList.add('active');
        
        let deleteButton = document.createElement('img');
        deleteButton.classList.add('deleteProjectButton');
        deleteButton.src = deleteSrc;

        if (i == 0 || i == 1) deleteButton.style.visibility = 'hidden' ;
        projectDiv.append(p);
        projectDiv.append(deleteButton);
        
        
        ctn.appendChild(projectDiv);
    }
    const addProjectButton = document.createElement('button');
    addProjectButton.innerHTML = 'Add Project';
    addProjectButton.classList.add('addProjectButton');
    ctn.appendChild(addProjectButton);

    const content = document.querySelector('.content');

    content.appendChild(ctn);
    //ctn is a project list, ctn is a add project button
    // will be display on the left of the container
}

export function displayTask(id){
    let projectList = getProjectList();
    let project = projectList[id];

    let ctn = document.querySelector('.task');
    ctn.innerHTML = '';
    
    // create a head sub
    const divHead = document.createElement('div');
    divHead.classList.add('task-item');
    divHead.setAttribute('id','divHead');
    const headTitle = document.createElement('div');
    headTitle.classList.add('taskTitle');
    headTitle.innerHTML = 'Task title';

    const dueDayTitle = document.createElement('div');
    dueDayTitle.classList.add('taskDueDay');
    dueDayTitle.setAttribute('id','dueday-title');
    dueDayTitle.innerHTML = 'Due day';

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id','taskCheckBox'); 
    checkBox.style.visibility = 'hidden';

    const editButton = document.createElement('img');
    editButton.style.visibility = 'hidden';
    editButton.src = editorSrc;
    const deleteButton = document.createElement('img');
    deleteButton.src = deleteSrc;
    deleteButton.style.visibility = 'hidden';
    divHead.append(headTitle, dueDayTitle, checkBox, editButton, deleteButton);

    
    ctn.appendChild(divHead);

    let taskArray = project.taskOfThis;

    for (let  i = 0; i<taskArray.length; i++){
        let task = document.createElement('div');

        const pTitle = document.createElement('div');
        pTitle.classList.add('taskTitle');

        pTitle.innerHTML = taskArray[i].title;
        
        
        const dueDayFormat = format(parseISO(taskArray[i].dueDay), 'MM/dd/yyyy');
        const pDueDay = document.createElement('div');
        pDueDay.classList.add('taskDueDay');
        pDueDay.innerHTML = dueDayFormat;
              

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id','taskCheckBox'); 
        
        checkBox.checked = taskArray[i].check;

        
        const editButton = document.createElement('img');
        editButton.classList.add('editTaskButton');
        editButton.src= editorSrc;

        const deleteButton = document.createElement('img');
        deleteButton.classList.add('deleteTaskButton');
        deleteButton.src = deleteSrc;

        // day month year input
        task.append(pTitle,pDueDay, checkBox, editButton, deleteButton);

        task.classList.add('task-item');
        // idOfProject identify which project the task belongs to
        task.setAttribute('idOfProject', id);
        task.setAttribute('indexOfTaskInArray', i);
        ctn.appendChild(task);
    }

    
    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('addTaskButton');
    addTaskButton.innerHTML = 'New Task';
    ctn.appendChild(addTaskButton);

    const content = document.querySelector('.content');
    content.appendChild(ctn);
}

