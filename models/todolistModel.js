const mongoose = require("mongoose");
const todolistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  text: {
    type: String,
    required: true,
    max: 100,
  },
  task_status: {
    type: String,
    enum: ["pending", "done"],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
const todolistModel = mongoose.model("Todolist", todolistSchema);

module.exports = todolistModel;
