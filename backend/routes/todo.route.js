const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { jwtParse } = require("../middlewares/auth");
const { todoValidation } = require("../middlewares/validation");

router
  .route("/")
  .get(jwtParse, todoController.getAllTodo)
  .post(jwtParse, todoValidation, todoController.createTodo);

router.route("/:id")
.put(jwtParse, todoValidation, todoController.updateTodo).delete(jwtParse, todoController.deleteTodo);

module.exports = router;
