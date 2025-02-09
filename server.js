const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
    console.log("Server is running on port 3000");
  })
  .catch(() => {
    console.log(error.message);
    process.exit(1);
  });
