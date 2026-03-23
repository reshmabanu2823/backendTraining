require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json());

/* CORS */
app.use(cors());

/* Helmet */
app.use(helmet());

/* Rate limiting */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later"
});

app.use(limiter);

/* Routes */
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to ${process.env.APP_NAME}`
  });
});

app.get("/about", (req, res) => {
  res.json({
    message: "This route is protected with security middleware"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});