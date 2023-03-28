const express = require("express");
const userRoute = express.Router();

// user model
let User = require("../models/User");
let Course = require("../models/Course");
const { promiseImpl } = require("ejs");
// const { default: mongoose } = require("mongoose");


// Add user
// the admin uses this function to add teachers, the student uses it to register themself
userRoute.route("/").post((req, res, next) => {
  const { firstName, lastName, email, password, profile } = req.body
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      data.name.firstName = firstName;
      data.name.lastName = lastName;
      data.email = email;
      data.password = password;
      data.profile = profile;
      res.json(data);
    }
  });
});

// get all users
userRoute.route("/").get((req, res, next) => {
  User.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {

      res.json(data);
    }
  });
});

// get all students
userRoute.route("/all-students").get((req, res, next) => {
  User.find({ profile: 0 }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get all teachers
userRoute.route("/all-teachers").get((req, res, next) => {
  User.find({ profile: 1 }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get user using their id
userRoute.route("/:id").get((req, res, next) => {

  User.findById(req.params.id, async (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data)
      res.json(data);
    }
  });
});


// get user courses using their id
userRoute.route("/courses/:id").get((req, res, next) => {
  let courses = [];

  User.findById(req.params.id, async (error, data) => {
    if (error) {
      return next(error);
    } else {
      courses = await Promise.all(data.teacher.courses.map((courseId) => {
        return Course.findById(courseId);
      }))
      console.log(courses)
      res.json(courses);
    }
  });
});

// get user using their name and password
userRoute.route("/").get((req, res, next) => {
  User.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//   login
userRoute.route("/login").post((req, res, next) => {
  User.find(req.body, (error, data) => {
    if (data) {
      res.json({ data });
    } else {
      res.json({ data });
    }
  });
});

// if you want to delete a user
userRoute.route("/delete-user/:id").delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//   update user's parameters
userRoute.route("/update-user/:id").put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("teacher successfully updated!");
      }
    }
  );
});

// Create student

userRoute.route("/create-a-student").post((req, res, next) => {
  const users = new User({
    ...req.body
  });
  users.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = userRoute;
