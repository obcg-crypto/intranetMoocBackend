const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
  name: { type: String, required: true },
  topicId: { type: String, required: true },
});

module.exports = mongoose.model('resources', resourceSchema);