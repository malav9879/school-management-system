const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true },
});

module.exports = mongoose.model('Attendance', attendanceSchema);