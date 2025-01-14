const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/tasks").get(getAllTasks);
router.route("/task").post(createTask);
router.route("/task/:id").put(updateTask).delete(deleteTask);

module.exports = router;
