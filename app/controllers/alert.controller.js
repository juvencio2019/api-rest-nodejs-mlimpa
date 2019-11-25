const Alert = require("../models/alert.model.js");

// Create and Save a new Alert
exports.create = (req, res) => {
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //Create an Alert
    const alert = new Alert({
        type: req.body.type,
        description: req.body.description,
        image: req.body.image,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng
    });

    //Save User in the database
    Alert.create(alert, (err, data) => {
        if(err)
        res.status(500).send({
            message:
            err.message || "Some error ocurred while creating the Alert."
        });
        else res.send(data);
    });
};

// Retrieve all Alerts from the database.
exports.findAll = (req, res) => {
    Alert.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving alerts."
        });
        else res.send(data);
    })
  
};

// Find a single Alert with a userId
exports.findOne = (req, res) => {
    Alert.findById(req.params.alertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send ({
                    message: `Not found User with id ${req.params.alertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Alert with id " + req.params.alertId
                });
            }
        } else res.send(data);
    });
  
};

// Update a Alert identified by the alertId in the request
exports.update = (req, res) => {

    //Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
  
    Alert.updateById(
        req.params.alertId,
        new Alert (req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Alert with id ${req.params.alertId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating ALert with id " + req.params.alertId
              });
            }
          } else res.send(data);
        }
    );
};

// Delete a Alert with the specified alertId in the request
exports.delete = (req, res) => {

    Alert.remove(req.params.alertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Alert with id ${req.params.alertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Alert with id " + req.params.alertId
                });
            }
        } else res.send({ message: `Alert was deleted successfully!` });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

    Alert.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all alerts."
        });
        else res.send({ message: `All Alerts were deleted successfully!` });
    });
  
};