const express = require("express");
const courseRoute = express.Router();

const { promiseImpl } = require("ejs");

// course model
let Course = require("../models/Course");
let User = require("../models/User");
let Topic = require("../models/topic");
// Add course
// the teacher/admin uses this to create a course
courseRoute.route("/create-course").post((req, res, next) => {

  console.log(req.body);
  let {userId,...attr} = req.body

  let course = Course.create( {users:[userId], ...attr}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      let prof = User.findById(userId,(err,doc)=>{
        if (error) {
          return next(error);
        } else {
          console.log(doc);
          doc.teacher.courses.push(data._id)
          doc.save()
          console.log(doc);
        }
      })
      
    }
  });
 
  // User.findById(userId)

});

courseRoute.get('/:id',(req,res,next)=>{
  let id = req.params.id
  Course.findById(id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
})

// get all courses
courseRoute.route("/").get((req, res, next) => {
  Course.find(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});



// if you want to delete a course
courseRoute.route("/delete-course/:id").delete((req, res, next) => {
  Course.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));

});

//   update course's parameters
courseRoute.route("/update-course/:id").post((req, res, next) => {
  
  console.log(req.body);
  Course.findByIdAndUpdate(
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

// get topics using course id
courseRoute.route("/get-topics/:id").get((req, res, next) => {
  let topics = [];
     console.log(req.params.id);
   Course.findById(req.params.id, async(error, data) => {
    if (error) {
      return next(error);
    } else {
      topics = await Promise.all(data.topics.map((topicId)=>{
        return Topic.findById(topicId);
      }))
      console.log(topics)
      res.json(topics);
    }
  });
});


// Tri all courses 

courseRoute.route("/tri-course/:id").get((req, res, next) => {
  
});



module.exports = courseRoute;
