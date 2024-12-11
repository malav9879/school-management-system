const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
});

module.exports = mongoose.model('Grade', gradeSchema);
