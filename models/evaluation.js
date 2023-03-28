const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profil: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("forum", topicSchema);
