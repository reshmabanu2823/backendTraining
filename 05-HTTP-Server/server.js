// STEP 1: Import HTTP module
const http = require("http");

// STEP 2: Create server
const server = http.createServer((req, res) => {

  // STEP 3: Routing
  if (req.url === "/") {
    res.end("Home Page");
  }

  else if (req.url === "/about") {
    res.end("About Page");
  }

  else if (req.url === "/contact") {
    res.end("Contact Page");
  }

  else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }

});

// STEP 4: Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});