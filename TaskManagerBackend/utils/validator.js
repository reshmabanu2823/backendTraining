function validateTask(task) {

if(!task.title){
throw new Error("Task title is required");
}

if(!task.userId){
throw new Error("User ID is required");
}

}

module.exports = { validateTask };