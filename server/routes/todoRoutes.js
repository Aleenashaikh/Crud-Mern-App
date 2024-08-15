const express = require("express");
const router = express.Router();
const {
  addTodo,
  editTodo,
  deleteTodo,
  deleteAllTodos,
  showTodos,
  findTodo,
  ascendingData,
  descendingData
} = require("../controllers/todoControllers");



//The routes are declared here for handling of different URL paths or endpoints. This file only defines only the type of requests (get,post), the actions that should be performed are declared in todoControllers file and is expoerted here.
router.post("/addTodo", addTodo);
router.post("/editTodo", editTodo);
router.get("/showTodos", showTodos);
router.post("/deleteTodo", deleteTodo);
router.post("/deleteAllTodos", deleteAllTodos);
router.post("/findTodo", findTodo);
router.get("/ascSort",ascendingData);
router.get("/desSort",descendingData);

module.exports = router;
