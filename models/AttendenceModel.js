const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  stdID: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  venue: {
    type: String,
    required: true,
  },
  attendance: {
    type: Boolean,
    default: true,
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
