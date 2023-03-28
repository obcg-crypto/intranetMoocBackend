const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    }
  },
  email: {
    type: String,
    match: /.+\@.+\..+/,
    unique: true,
    required: true,
    lowercase: true,
  }, 
  password:{
    type: String,
    required: true
  }, 
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  profile: {
    type: Number,
    required: true
  }, // if 0 then a student, if 1 then a teacher else an error. 
  profilePicture: {
    type: String,
    required:true,
    default: "path-to-default-profile-picture"
  }, // if 0 then a student, if 1 then a teacher else an error. 
  student: {
    courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }]
  },
  teacher: {
    courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
    admin: {
      type: Boolean,
      default: false, // if false then we get a normal teacher else we hava an admin i.e a teacher with more priviledges. 
    }
  }
});

module.exports = mongoose.model("User", userSchema);