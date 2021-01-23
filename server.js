// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config();
const express = require("express");
const todolistController = require("./controllers/todolistcontroller");
const diaryController = require("./controllers/dairyController");
const userController = require("./controllers/userController");
const moodController = require("./controllers/moodController");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const todolistModel = require("./models/todolistModel");
const app = express();
const port = 5000;
app.use(express.urlencoded({extended: true}));

// =======================================
//              MONGOOSE
// =======================================
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.set("useFindAndModify", false);

// =======================================
//              ROUTES
// =======================================

//** User **
app.post("/api/v1/user/register", userController.userRegister); // registration
app.post("/api/v1/user/login", userController.userLogin); // login
app.get("/api/v1/users/me", userController.userProfile); // get user profile

//** Diary route **
app.get("/api/v1/diaryentry", diaryController.listDiaryEntry); // get diary entry list
app.post("/api/v1/diaryentry", diaryController.createDiaryEntry); // create diary entry
app.get("/api/v1/diaryentry/:id", diaryController.getDiaryEntry); // get diary entry
app.patch("/api/v1/diaryentry/:id", diaryController.editDiaryEntry); // edit diary entry
app.delete("/api/v1/diaryentry/:id", diaryController.deleteEntry); // delete diary entry

//** To-do list route **
app.get("/api/v1/todolist", todolistController.listTask); // get to-do list
app.post("/api/v1/todolist", todolistController.createTask); // create to-do task
app.patch("/api/v1/todolist/:id", todolistController.updateTask); // edit to-do task
app.delete("/api/v1/todolist/:id", todolistController.removeTask); // delete to-do task

//** Mood route **
app.get("/api/v1/mood", moodController.listMood); // get mood
app.post("/api/v1/mood", moodController.createMood); // create mood

// =======================================
//              LISTENER
// =======================================
mongoose
  .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((response) => {
    // DB connected successfully
    console.log("DB connection successful");

    app.listen(process.env.PORT || port, () => {
      console.log(`dairyRepo listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
