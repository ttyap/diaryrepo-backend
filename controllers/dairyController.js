const diaryModel = require("../models/diaryModel");
const jwt = require("jsonwebtoken");

const diaryController = {
  listDiaryEntry: (req, res) => {
    const user = jwt.decode(req.headers["token"]);
    diaryModel
      .find({ username: user.username},
        {
          'text': 1,
          'created_at':1

        }   ).sort({'created_at': -1})
      .then((diaryResult) => {
        res.json({

          success: true,
          message: "diary listed",
          text: diaryResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getDiaryEntry: (req, res) => {
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
    const user = jwt.decode(req.headers["token"]);

    diaryModel
      .create({
        username: user.username,
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
    diaryModel
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

module.exports = diaryController;
