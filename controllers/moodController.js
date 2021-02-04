const moodModel = require("../models/moodModel");

const moodController = {
  createMood: (req, res) => {
    console.log(req.body);
    // userAuth();
    moodModel
      .create({
        mood: parseInt(req.body.mood),
        created_at: Date.now(),
      })
      .then((moodResult) => {
        console.log(moodResult);
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
    userAuth();
    moodModel
      .findOne({
        username: username.userData,
      })
      .then((moodResult) => {
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
module.exports = moodController;
