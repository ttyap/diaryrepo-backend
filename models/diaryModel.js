const mongoose = require("mongoose");

const dairySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const dairyModel = mongoose.model("Dairy", dairySchema);

module.exports = dairyModel;
