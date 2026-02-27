const tasks = require("../data/tasks");

// Get tasks of user
function getUserTasks(userId) {
  return tasks.filter(task => task.userId === userId);
}

// Add new task
function addTask(taskData) {

  const newTask = {
    id: tasks.length + 1,
    ...taskData,
    completed: false
  };

  tasks.push(newTask);
  return newTask;
}

// Task analytics
function taskSummary(userTasks) {

  const completed = userTasks.filter(t => t.completed).length;

  const pending =
    userTasks.reduce(
      (count, task) =>
        task.completed ? count : count + 1,
      0
    );

  return { completed, pending };
}

module.exports = {
  getUserTasks,
  addTask,
  taskSummary
};