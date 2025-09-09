const mongoose = require("mongoose");

// employee schema and model
const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeCode: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

// employee model creation
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
