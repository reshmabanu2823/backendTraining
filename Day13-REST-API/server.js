const express = require("express");

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Reshma", email: "reshma@gmail.com" }
];

/* GET all users */
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

/* GET single user */
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

/* POST add user */
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

/* PUT update user */
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});

/* DELETE user */
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  res.status(200).json({ message: "User deleted successfully" });
});

/* Centralized error handling */
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Day 13 REST API server running on port 3000");
});