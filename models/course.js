const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  openAt: Date,
  closeAt: Date,
  students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  teachers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  topics: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Topic" }],
  assignement: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Submission" }]
});

module.exports = mongoose.model("Course", courseSchema);
