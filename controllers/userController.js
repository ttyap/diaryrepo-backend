const userModel = require("../models/userModel");
const uuid = require("uuid");
const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

const userController = {
  userRegister: (req, res) => {
    userModel
      .findOne({$or: [{email: req.body.email}, {username: req.body.username}]})

      .then((user) => {
        if (user) {
          res.statusCode = 400;
          res.json({
            success: false,
            message: "Email or username already exists",
          });
          return;
        }
        const salt = uuid.v4();
        const combination = salt + req.body.password;

        const hash = SHA256(combination).toString();

        userModel
          .create({
            username: req.body.username,
            email: req.body.email,
            pwsalt: salt,
            hash: hash,
          })
          .then((createUser) => {
            res.json({
              success: true,
              message: "User created",
            });
          })
          .catch((err) => {
            res.json({
              success: false,
              message: "Error",
            });
          });
      });
  },

  userLogin: (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.statusCode = 400;
      message = "Required fields cannot be left blank";
      res.json({
        success: false,
        message: message,
      });
      return;
    }

    userModel
      .findOne({username: req.body.username})
      .then((result) => {
        if (!result) {
          res.statusCode = 401;
          res.json({
            success: false,
            message: "Incorrect username or password!",
          });
          return;
        }
        const hash = SHA256(result.pwsalt + req.body.password).toString();

        if (hash !== result.hash) {
          res.statusCode = 401;
          res.json({
            success: false,
            message: "Incorrect username or password!",
          });
          return;
        }
        const token = jwt.sign(
          {
            id: result._id,
            username: result.username,
          },
          process.env.JWT_SECRET,
          {
            algorithm: "HS384",
            expiresIn: "1h",
          }
        );
        const rawJWT = jwt.decode(token);

        res.json({
          success: true,
          token: token,
          expiresAt: rawJWT.exp,
          message: "login successful",
        });
      })

      .catch((err) => {
        console.log(err);
        res.statusCode = 500;
        res.json({
          success: false,
          message: "unable to login due to unexpected error",
        });
      });
  },

  userProfile(req, res) {
    const user = jwt.decode(req.headers["token"]);
    userModel
      .find({
        username: user.username,
      })
      .then((userResult) => {
        res.json({
          success: true,
          message: "user listed",
          user: userResult,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = userController;
