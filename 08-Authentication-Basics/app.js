const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Temporary user storage
let users = [];


// Register User (Password Hashing)

app.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };

  users.push(user);

  res.send("User registered successfully");

});


// Login User (Generate JWT Token)

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { userId: user.id },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });

});


// Middleware (Protected Route)

function authMiddleware(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();

  } catch (error) {

    res.status(400).send("Invalid token");

  }

}


// Protected API

app.get("/profile", authMiddleware, (req, res) => {

  res.send("This is a protected profile route");

});


app.listen(5000, () => {

  console.log("Server running on http://localhost:5000");

});