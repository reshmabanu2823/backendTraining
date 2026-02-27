const authenticateUser =
  require("../services/userService");

const {
  getUserTasks,
  addTask,
  taskSummary
} = require("../services/taskService");

async function taskDashboard() {

  try {

    const user =
      await authenticateUser(1);

    console.log("Welcome", user.name);

    const tasks =
      getUserTasks(user.id);

    console.log("User Tasks:", tasks);

    const newTask =
      addTask({
        title: "Learn Async JS",
        userId: user.id
      });

    console.log("New Task Added:", newTask);

    const summary =
      taskSummary(tasks);

    console.log("Task Summary:", summary);

  } catch (err) {
    console.log(err);
  }
}

module.exports = taskDashboard;