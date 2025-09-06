const mongoose = require("mongoose");

const generatorLogSchema = new mongoose.Schema(
  {
    logDate: {
      type: Date,
      required: true,
    },

    shift: {
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
      type: String,
    },

    generatorId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    employee: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GeneratorLog = mongoose.model("GeneratorLog", generatorLogSchema);

module.exports = GeneratorLog;
