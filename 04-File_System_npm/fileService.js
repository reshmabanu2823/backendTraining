const fs = require("fs");

// Create File
function createFile() {
  fs.writeFileSync(
    "user.txt",
    "User: Reshma Banu"
  );
  console.log("File Created");
}

// Read File
function readFile() {
  const data =
    fs.readFileSync("user.txt", "utf8");

  console.log("File Content:", data);
}

// Append File
function updateFile() {
  fs.appendFileSync(
    "user.txt",
    "\nCourse: Backend Training"
  );

  console.log("File Updated");
}

// Delete File
function deleteFile() {
  fs.unlinkSync("user.txt");
  console.log("File Deleted");
}

module.exports = {
  createFile,
  readFile,
  updateFile,
  deleteFile
};