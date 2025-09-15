const mongoose = require("mongoose");

const generatorLogSchema = new mongoose.Schema(
  {
    logDate: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    onTime: {
      type: Date,
      required: true,
    },

    offTime: {
      type: Date,
    },

    duration: {
      type: Number,
    },

    generatorId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    firstEmpName: {
      type: String,
      required: true,
    },
    secondEmpName: {
      type: String,
      required: false,
    },
    employeeCode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const GeneratorLog = mongoose.model("GeneratorLog", generatorLogSchema);

module.exports = GeneratorLog;
