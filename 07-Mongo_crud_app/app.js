// STEP 1: Import required modules
const express = require("express");
const mongoose = require("mongoose");

// Import User model
const User = require("./models/User");

// STEP 2: Create express app
const app = express();

// STEP 3: Middleware
app.use(express.json());

// STEP 4: Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/backendDB")
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err);
});


// ============================
// CRUD ROUTES
// ============================


// CREATE USER
app.post("/users", async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.send("User created successfully");

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// READ USERS
app.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// UPDATE USER
app.put("/users/:id", async (req, res) => {

  try {

    await User.findByIdAndUpdate(req.params.id, req.body);

    res.send("User Updated Successfully");

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// DELETE USER
app.delete("/users/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.send("User Deleted Successfully");

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// STEP 5: Start Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});