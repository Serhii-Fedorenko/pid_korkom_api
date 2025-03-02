const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const articlesRouter = require("./routes/api/articles");
const authRouter = require("./routes/api/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/articles", articlesRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(400).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
