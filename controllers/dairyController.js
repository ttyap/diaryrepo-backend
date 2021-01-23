const diaryModel = require("../models/diaryModel");

const diaryController = {
  listDiaryEntry: (req, res) => {
    userAuth();
    diaryModel
      .findOne({
        username: userData.username,
      })
      .then((diaryResult) => {
        res.json({
          success: true,
          message: "diary listed",
          task: diaryResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDiaryEntry: (req, res) => {
    userAuth();
    diaryModel
      .findOne({
        _id: req.params.id,
      })
      .then((diaryResult) => {
        res.json({
          success: true,
          message: "entry listed",
          task: diaryResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createDiaryEntry: (req, res) => {
    //userAuth();
    diaryModel
      .create({
        username: req.body.username,
        text: req.body.text,
        created_at: Date.now(),
      })
      .then((entryResult) => {
        res.json({
          success: true,
          message: "entry created",
          entryResult: entryResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  editDiaryEntry: (req, res) => {
    userAuth();
    todolistModel
      .updateOne(
        {
          _id: req.params.id,
        },
        {
          text: req.body.text,
        }
      )
      .then((entryEdited) => {
        if (entryEdited) {
          res.json({
            success: true,
            message: "entry updated!",
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
  deleteEntry: (req, res) => {
    userAuth();
    diaryModel
      .findOneAndDelete({
        _id: req.params.id,
      })
      .then((result) => {
        res.json({
          success: true,
          message: "Diary entry delete successful",
        });
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({
          success: false,
          message: "Diary entry delete failed",
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
module.exports = diaryController;
