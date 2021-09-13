import {removeActive, addActive, displayProjectPopUp, removeDisplayProjectPopUp, createProjectPopUp, addActiveToTheNewest, createTaskPopUp, displayTaskPopUp,removeDisplayTaskPopUp, getIdOfCurrentProject, createEditTaskFormPopUp } from "./modules/eventsCSS";
import { removeTaskFromProject, createProject, getProjectList, createTask, removeProject, removeEveryButTwo } from "./modules/storage";
import project from "./modules/project";
import {display, displayTask, updateProjectDom} from "./modules/display";
import './styleForPopUp.css';
import './style.css';

display();
createProjectPopUp();
createTaskPopUp();
// event to display task of each project based on its id
const activeProjectControl = function(){
    const project_ctn = document.querySelector('.project');
    const prcts = project_ctn.querySelectorAll('a');
    prcts.forEach(prct => prct.addEventListener('click', function(){
        removeActive();
        addActive(prct);
        let idOfProject = parseInt(prct.getAttribute('id'));
        displayTask(idOfProject);
        totalTaskEvenControl();
    }));

};
activeProjectControl();
// event to display pop up window to get input create new project
const addProjectButtonControl = function(){
    let addProjectButton  = document.querySelector('.addProjectButton');
    addProjectButton.addEventListener('click', function(){
        displayProjectPopUp();         
    });
};
addProjectButtonControl();
// even control in pop up window
const projectPopUpFormEventControl = function(){
    const creatProjectButton = document.querySelector('.createProject');
    creatProjectButton.addEventListener('click', function(){
        const projectTitle = document.getElementById('projectTitle').value;
        if (projectTitle == '') {
            alert('Title Required to create project!');
        } else{
            const projectDescription = document.getElementById('projectDescription').value;
            createProject(projectTitle, projectDescription);
            removeDisplayProjectPopUp();
            display();
            removeActive();
            addActiveToTheNewest();
            totalEvenControl();
        }

    });

    const cancelProjectButton = document.querySelector('.cancelProject');
    cancelProjectButton.addEventListener('click', function(){
        removeDisplayProjectPopUp();
    })
};
projectPopUpFormEventControl();


// function reset all event dom control after display
const totalEvenControl = function(){
    createProjectPopUp();
    activeProjectControl();
    addProjectButtonControl();
    projectPopUpFormEventControl();
}

// function for task popup display

// add task button
const addTaskButtonControl = function(){
    const addTaskButton = document.querySelector('.addTaskButton');
    addTaskButton.addEventListener('click', function(){
        displayTaskPopUp();
    });
};
addTaskButtonControl();

// task pop up event control
const taskPopUpFormEventControl = function(){
    const creatTaskButton = document.querySelector('.createTask');
    creatTaskButton.addEventListener('click', function(){
        const taskTitle = document.getElementById('taskTitle').value;
        if (taskTitle == '') {
            alert('Title Task required!');
        } else{
            let taskDescription = document.getElementById('taskDescription').value;
            let dueDay;
            let check = 'false';
            let idOfProject = getIdOfCurrentProject();
            createTask(taskTitle, taskDescription, dueDay, check, idOfProject);
            removeDisplayTaskPopUp();
            // reset display
            displayTask(idOfProject);
            totalTaskEvenControl();
        }
    });

    const cancelTask = document.querySelector('.cancelTask');
    cancelTask.addEventListener('click', removeDisplayTaskPopUp);
};
taskPopUpFormEventControl();

// task delete even control
const taskDeleteEvenControl = function(){
    const ctn = document.querySelector('.task');
  
    const deleteButtons = ctn.querySelectorAll('.deleteTaskButton');
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', function(){
        // these two id below identify which project-task we doing
        let idOfProject = deleteButton.parentElement.getAttribute('idOfProject');
        let indexOfTaskInArray = deleteButton.parentElement.getAttribute('indexOfTaskInArray');
        removeTaskFromProject(idOfProject, indexOfTaskInArray);
        displayTask(idOfProject);
        totalTaskEvenControl();
    }));

    const editButtons = ctn.querySelectorAll('.editTaskButton');
    editButtons.forEach(editButton => editButton.addEventListener('click', function(){
        let idOfProject = editButton.parentElement.getAttribute('idOfProject');
        let indexOfTaskInArray = editButton.parentElement.getAttribute('indexOfTaskInArray');
        createEditTaskFormPopUp(idOfProject, indexOfTaskInArray);
    }))
}
taskDeleteEvenControl();

function totalTaskEvenControl(){
    createTaskPopUp();
    addTaskButtonControl();
    taskPopUpFormEventControl();
    taskDeleteEvenControl();
}




// done display, next: event for save/cancel task edit