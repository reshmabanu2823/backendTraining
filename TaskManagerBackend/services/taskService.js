const tasks = require("../data/tasks");

function getAllTasks() {

return tasks;

}

function createTask(task) {

tasks.push(task);

return task;

}

function deleteTask(id) {

const index = tasks.findIndex(t => t.id == id);

if(index === -1){
throw new Error("Task not found");
}

tasks.splice(index,1);

}

module.exports = {

getAllTasks,
createTask,
deleteTask

};