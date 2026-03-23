const path = "./data/users.json";

const {
  readData,
  writeData
} = require("../utils/fileHandler");

// Register User
function registerUser(name) {

  const users = readData(path);

  const newUser = {
    id: Date.now(),
    name,
    createdAt: new Date()
  };

  users.push(newUser);

  writeData(path, users);

  return newUser;
}

// Get All Users
function getUsers() {
  return readData(path);
}

module.exports = {
  registerUser,
  getUsers
};