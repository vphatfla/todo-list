import { parseISO, format } from "date-fns";
import { getProjectList } from "./storage";


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
        p.innerHTML = projectList[i].title;

        projectDiv.setAttribute('id', i);
        if (i==0) projectDiv.classList.add('active');
        
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteProjectButton');
        deleteButton.innerHTML = 'Delete';

        projectDiv.append(p);
        
        if (i != 0 && i != 1) projectDiv.append(deleteButton);
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
    
    let taskArray = project.taskOfThis;

    for (let  i = 0; i<taskArray.length; i++){
        let task = document.createElement('div');

        const p = document.createElement('p');
        
        const dueDayFormat = format(parseISO(taskArray[i].dueDay), 'MM/dd/yyyy');
        p.innerHTML = `${taskArray[i].title} due ${dueDayFormat}`;

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id','taskCheckBox'); 
        
        checkBox.checked = taskArray[i].check;

        const editButton = document.createElement('button');
        editButton.classList.add('editTaskButton');
        editButton.innerHTML = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteTaskButton');
        deleteButton.innerHTML = 'Delete';

        // day month year input
        task.append(p, checkBox, editButton, deleteButton);

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

