const fs = require("fs");

fs.writeFile(
  "log.txt",
  "Server Started",
  (err) => {
    if (err)
      console.log(err);
    else
      console.log("Async File Created");
  }
);

console.log("Program continues...");