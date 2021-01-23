const todolistModel = require("../models/todolistModel");

const todolistController = {
  listTask: (req, res) => {
    userAuth();
    todolistModel
      .findOne({
        username: userData.username,
      })
      .then((taskResult) => {
        res.json({
          success: true,
          message: "task listed",
          task: taskResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createTask: (req, res) => {
    // userAuth();
    todolistModel
      .create({
        username: req.body.username,
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
      text: req.body.text,
      task_status: req.body.task_status,
    };

    // userAuth();
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
    userAuth();
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

function userAuth() {
  const authToken = req.headers.auth_token;
  let userData;

  if (!authToken) {
    res.json({
      success: false,
      message: "Auth header value is missing",
    });
    return;
  }
  try {
    userData = jwt.verify(authToken, process.env.JWT_SECRET, {
      algorithms: ["HS384"],
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Auth token is invalid",
    });
    return;
  }
}
module.exports = todolistController;
