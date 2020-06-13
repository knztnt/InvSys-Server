const db = require("../models");
const StudItemReq = db.student_item_request;

const Op = db.Sequelize.Op;

// Create and Save a new request
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studentId) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  // Create a Request
  const request = {
    studentId: req.body.studentId,
    item_no: req.body.item_no,
    item_name: req.body.item_name,
    quantity: req.body.quantity,
    description: req.body.description,
    staffId: req.body.staffId,
    reason: req.body.reason,
  };

  // Save Request in the database
  StudItemReq.create(request)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Request.",
      });
    });
};
// fetch all data from database

exports.findAll = (req, res) => {
  const item_name = req.query.item_name;
  var condition = item_name
    ? { service_name: { [Op.like]: `%${service_name}%` } }
    : null;

  StudItemReq.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    });
};
