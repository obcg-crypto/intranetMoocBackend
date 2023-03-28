const express = require("express");
const resourceRoute = express.Router();

// resource model
let Resource = require("../models/resource");

// Add resource
// the teacher/admin uses this to create a resource
resourceRoute.route("/create-resource").post((req, res, next) => {
  Resource.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get all resources
resourceRoute.route("/").get((req, res, next) => {
  Resource.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// get resource using id
resourceRoute.route("/:id").get((req, res, next) => {
  Resource.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


// if you want to delete a resource
resourceRoute.route("/delete-resource/:id").delete((req, res, next) => {
  Resource.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//   update resource's parameters
resourceRoute.route("/update-resource/:id").put((req, res, next) => {
  Resource.findByIdAndUpdate(
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

module.exports = resourceRoute;
