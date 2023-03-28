const express = require("express");
const topicRoute = express.Router();

// topic model
let Topic = require("../models/topic");
let Course = require("../models/Course");


// Add topic
// the teacher/admin uses this to create a topic
// topicRoute.route("/create-topic").post((req, res, next) => {
//   Topic.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {

//       res.json(data);
//     }
//   });
// });

topicRoute.route("/create-topic").post((req, res, next) => {

    console.log(req.body);
    let {courseId,...attr} = req.body
  
    let topic = Topic.create( req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        let course = Course.findById(courseId,(err,doc)=>{
          if (error) {
            return next(error);
          } else {
            // console.log(doc);
            doc.topics.push(data._id)
            doc.save()
            // console.log(doc);
          }
        })
        
      }
    });
   
    // User.findById(courseId)
  
  });

// get all topics
topicRoute.route("/").get((req, res, next) => {
  Topic.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get topic using id
topicRoute.route("/:id").get((req, res, next) => {
  Topic.findOne({ _id: req.params.id })
    .then(topics => res.status(200).json(topics))
    .catch(error => res.status(404).json({ error }));
});


// if you want to delete a topic
topicRoute.route("/delete-topic/:id").delete((req, res, next) => {
  Topic.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//   update topic's parameters
topicRoute.route("/update-topic/:id").post((req, res, next) => {
  Topic.findByIdAndUpdate(
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
        console.log("Topic successfully updated!");
      }
    }
  );
});

// add an introduction video to topic

topicRoute.route("/add-resource/:id").post((req, res, next) => {
  console.log(req.body);
  Topic.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("video successfully updated!");
      }
    }
  );  
});

module.exports = topicRoute;
