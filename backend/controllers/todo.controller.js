const User = require("../models/user.model");
const Todo = require("../models/todo.model");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.createTodo = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const todo = new Todo({user:id,...req.body});
  await todo.save();
  res.json({
    message: "Success",
    data: todo,
  });
});

exports.getAllTodo = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const todo = await Todo.find({ user: id });
  if (todo.length==0) {
    return next(AppError.create("Todo not found", "Error", 400));
  }
  res.status(200).json({
    message: "Success",
    data: todo,
  });
});

exports.updateTodo = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const todo = await Todo.findByIdAndUpdate(id,{...req.body},{new:true})
  res.json({
    message: "Success",
    data: todo,
  });
});

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  await Todo.findByIdAndDelete(id)
  res.json({
    message: "Success",
  });
});
