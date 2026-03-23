const {
  registerUser,
  getUsers
} = require("./services/loggerService");

// Register users
const user1 =
  registerUser("Reshma");

console.log("User Added:", user1);

// Fetch users
const users = getUsers();

console.log("All Users:", users);