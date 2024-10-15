require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const AppError = require("./utils/appError");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");
const errorController = require("./controllers/error.controller");


mongoose
  .connect('mongodb://localhost:27017/todo-list')
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });



const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", userRouter);
app.use("/api/v1/todo", todoRouter);


app.all("*", (req, res, next) => {
  next(AppError.create("Page not found", "ERROR", 404));
});

app.use(errorController);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
