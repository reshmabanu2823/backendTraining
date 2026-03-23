const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authController = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");
const taskController = require("./controllers/taskController");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CORS Configuration - Allow requests from frontend
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5000", "http://localhost:5500", "http://localhost:8000", "http://127.0.0.1:5000", "http://127.0.0.1:5500", "file://"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// TEST ROUTE
app.post("/test-json", (req, res) => {
  res.json({ message: "This is JSON", test: true });
});

mongoose.connect("mongodb://127.0.0.1:27017/taskManagerDB")
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err);
});


// ROUTES

// Register
app.post("/register", authController.register);

// Login
app.post("/login", authController.login);

// Protected route
app.get("/profile", authMiddleware, (req, res) => {
  res.send("This is a protected route");
});

// DEBUG ROUTE - Check token
app.get("/debug/token", authMiddleware, (req, res) => {
  console.log('Debug - req.user:', req.user);
  res.json({ 
    message: "Token decoded successfully",
    user: req.user,
    userId: req.user ? req.user.id : 'NO USER'
  });
});

// Task routes - Protected
app.get("/tasks", authMiddleware, taskController.getTasks);
app.post("/tasks", authMiddleware, taskController.createTask);
app.put("/tasks/:id", authMiddleware, taskController.updateTask);
app.delete("/tasks/:id", authMiddleware, taskController.deleteTask);
app.delete("/tasks", authMiddleware, taskController.clearAllTasks);


// ERROR HANDLER
app.use(errorHandler);


// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});