// STEP 1: Import express
const express = require("express");

// STEP 2: Create express app
const app = express();

// STEP 3: Middleware
app.use(express.json());


// STEP 4: HOME ROUTE
app.get("/", (req, res) => {
  res.send("Home Route Working");
});


// STEP 5: GET Route
app.get("/user", (req, res) => {
  res.send("GET Request - User Data");
});


// STEP 6: POST Route
app.post("/user", (req, res) => {
  res.send("POST Request - User Created");
});


// STEP 7: PUT Route
app.put("/user", (req, res) => {
  res.send("PUT Request - User Updated");
});


// STEP 8: DELETE Route
app.delete("/user", (req, res) => {
  res.send("DELETE Request - User Deleted");
});


// STEP 9: Start Server
app.listen(3000, () => {
  console.log("Express server running at http://localhost:3000");
});