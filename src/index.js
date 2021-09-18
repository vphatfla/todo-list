import {removeActive, addActive, displayProjectPopUp, removeDisplayProjectPopUp, createProjectPopUp, addActiveToTheNewest, createTaskPopUp, displayTaskPopUp,removeDisplayTaskPopUp, getIdOfCurrentProject, createEditTaskFormPopUp } from "./modules/eventsCSS";
import { removeTaskFromProject, createProject, getProjectList, createTask, deleteProject, saveCheckBoxTask, setTodayTask } from "./modules/storage";
import {display, displayTask, displayTodayAtHeader} from "./modules/display";
import './styleForPopUp.css';
import './style.css';

let checkIfClickDeleteButton = false;
display();
createProjectPopUp();
createTaskPopUp();
displayTodayAtHeader();
setInterval(displayTodayAtHeader,10000);
setTodayTask();
setInterval(setTodayTask, 1000);
// event to display task of each project based on its id
const activeProjectControl = function(){

    const project_ctn = document.querySelector('.project');
    const prcts = project_ctn.querySelectorAll('div');
    
    prcts.forEach(prct => prct.addEventListener('click', function(){
        if (checkIfClickDeleteButton) {
            checkIfClickDeleteButton = false;
            return;}
        else {
            
            removeActive();

            addActive(prct);
            let idOfProject = parseInt(prct.getAttribute('id'));
            // action when click delete button, delebutton still belong to the div
            try {
                displayTask(idOfProject);    
                totalTaskEvenControl();
            } catch (error) {
                
            }
        }
    

    }));
    
    

};
activeProjectControl();
//delete project button control
const deleteProjectButtonControl = function(){
    const deleteButtons = document.querySelectorAll('.deleteProjectButton');
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', function(){
        const idOfProject = parseInt(deleteButton.parentElement.getAttribute('id'));
        deleteProject(idOfProject);
        display();

        displayTask(getProjectList().length-1);

        removeActive();

        addActiveToTheNewest();

        // instead of total evencontrol
        
        createProjectPopUp();
        addProjectButtonControl();
        projectPopUpFormEventControl();
        deleteProjectButtonControl();
        

        totalTaskEvenControl();

        checkIfClickDeleteButton = true;
        activeProjectControl();
    }))
}
deleteProjectButtonControl();
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
            displayTask(getProjectList().length-1);
            
            removeActive(); 
            addActiveToTheNewest();
            totalEvenControl();
            totalTaskEvenControl();
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
    
    addProjectButtonControl();
    projectPopUpFormEventControl();
    deleteProjectButtonControl();
    activeProjectControl();
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
            let dueDay = document.getElementById('taskDueDay').value;
            
            let check = false;
            let idOfProject = getIdOfCurrentProject();
            
            createTask(taskTitle, taskDescription, dueDay, check, idOfProject);
            removeDisplayTaskPopUp();
            // reset display
            displayTask(idOfProject);
            setTodayTask();
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

        totalEvenControl();
    }))
}
taskDeleteEvenControl();

export function totalTaskEvenControl(){
    createTaskPopUp();
    addTaskButtonControl();
    taskPopUpFormEventControl();
    taskDeleteEvenControl();
    checkBoxTaskEvenControl();
}
// checkbox of task done
const checkBoxTaskEvenControl = function(){
    const checkBoxs = document.querySelectorAll('#taskCheckBox');
    checkBoxs.forEach(checkBox => checkBox.addEventListener('change', function(){
        let idOfProject = checkBox.parentElement.getAttribute('idOfProject');
        let indexOfTaskInArray = checkBox.parentElement.getAttribute('indexOfTaskInArray');
        let valueOfCheckBox = checkBox.checked;
        saveCheckBoxTask(idOfProject, indexOfTaskInArray, valueOfCheckBox);
    }))
};
checkBoxTaskEvenControl();

// next: control when delete 1 task from 1 project, the same task need to be deleted in others