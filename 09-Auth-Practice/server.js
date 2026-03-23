const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "mysecret";

// Fake user database
let user = { email: "test@gmail.com", password: "" };


// REGISTER
app.post("/register", async (req, res) => {

    const { email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = { email, password: hashedPassword };

    res.json({ message: "User registered successfully" });

});


// LOGIN
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (email !== user.email) {
        return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });

    res.json({ token });

});


// AUTH MIDDLEWARE
function verifyToken(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {

        const decoded = jwt.verify(token, SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }

}


// PROTECTED ROUTE
app.get("/profile", verifyToken, (req, res) => {

    res.json({
        message: "Protected route accessed",
        user: req.user
    });

});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
