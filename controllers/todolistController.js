const todolistModel = require("../models/todolistModel");
const jwt = require("jsonwebtoken");

const todolistController = {
  listTask: (req, res) => {
    const user = jwt.decode(req.headers["token"]);
    todolistModel
      .find({
        username: user.username,
      })
      .then((taskResult) => {
        console.log(taskResult);
        res.json({
          success: true,
          message: "task listed",
          text: taskResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createTask: (req, res) => {
    const user = jwt.decode(req.headers["token"]);
    todolistModel
      .create({
        username: user.username,
        text: req.body.text,
        task_status: "pending",
        created_at: Date.now(),
      })
      .then((taskResult) => {
        res.json({
          success: true,
          message: "task created",
          task: taskResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateTask: (req, res) => {
    const updateTask = {
      // text: req.body.text,
      task_status: req.body.task_status,
    };

    todolistModel
      .updateOne(
        {
          _id: req.params.id,
        },
        updateTask
      )
      .then((taskUpdated) => {
        if (taskUpdated) {
          res.json({
            success: true,
            message: "Task updated!",
          });
          return;
        }
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({
          success: false,
          message: "An unexpected error has occured",
        });
      });
  },
  removeTask: (req, res) => {
    todolistModel
      .findOneAndDelete({
        _id: req.params.id,
      })
      .then((result) => {
        res.json({
          success: true,
          message: "task removed successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({
          success: false,
          message: "task removal failed",
        });
      });
  },
};

module.exports = todolistController;
