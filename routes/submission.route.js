const express = require("express");
const submissionRoute = express.Router();
let Course = require("../models/Course");

// evaluation model
let submission = require("../models/submission");


submissionRoute.route("/create-assignement/:id").put((req, res, next) => {

  const submissions = new submission({
    ...req.body
  });

  submissions.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));

});

submissionRoute.route("/create-assignement/:id").post((req, res, next) => {

  const submissions = new submission({
    ...req.body
  });

  submissions.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));

});


submissionRoute.route("/get-assignement").get((req, res, next) => {
  submission.find()
    .then(submissions => res.status(200).json(submissions))
    .catch(error => res.status(400).json({ error }));
});

//   update submission's parameters
submissionRoute.route("/update-submission/:id").put((req, res, next) => {
  submission.findByIdAndUpdate(
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
        console.log("submission successfully updated!");
      }
    }
  );
});

//   delete submission's parameters

submissionRoute.route('/del-assignement/:id').delete((req, res, next) => {
  submission.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


submissionRoute.route("/get-assignement/:id").get((req, res, next) => {
  submission.find({courseId: req.body._id})
    .then(submissions => res.status(200).json(submissions))
    .catch(error => res.status(400).json({ error }));
});

module.exports = submissionRoute;