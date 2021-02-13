const moodModel = require("../models/moodModel");
const jwt = require("jsonwebtoken");

const moodController = {
  createMood: (req, res) => {
    const user = jwt.decode(req.headers["token"]);
    moodModel
      .create({
        username: user.username,
        mood: parseInt(req.body.mood),
        created_at: Date.now(),
      })
      .then((moodResult) => {
        res.json({
          success: true,
          message: "mood created",
          mood: moodResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  listMood: (req, res) => {
    const user = jwt.decode(req.headers["token"]);

    moodModel
      .aggregate([
        {
          $match: {
            username: user.username,
          },
        },
        {
          $group: {
            _id: {
              $cond: {
                if: {$eq: ["$mood", 1]},
                then: "Angry",
                else: {
                  $cond: {
                    if: {$eq: ["$mood", 2]},
                    then: "Sad",
                    else: {
                      $cond: {
                        if: {$eq: ["$mood", 3]},
                        then: "Meh",
                        else: {
                          $cond: {
                            if: {$eq: ["$mood", 4]},
                            then: "Good",
                            else: {
                              $cond: {
                                if: {$eq: ["$mood", 5]},
                                then: "Gr8",
                                else: "Loved",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
      ])
      .then((moodResult) => {
        console.log(moodResult);
        res.json({
          success: true,
          message: "mood listed",
          mood: moodResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = moodController;
