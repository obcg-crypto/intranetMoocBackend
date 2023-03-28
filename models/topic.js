const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  videoIntro: {
    type: String,
    default: '',
  },
  resources: Array,

});

module.exports = mongoose.model("Topic", topicSchema);
