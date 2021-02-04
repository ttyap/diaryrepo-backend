const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   max: 100,
  // },
  mood: {
    type: Number,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const moodModel = mongoose.model("Mood", moodSchema);

module.exports = moodModel;
