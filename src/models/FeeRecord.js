const mongoose = require('mongoose');

const feeRecordSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Paid', 'Unpaid'], required: true },
});

module.exports = mongoose.model('FeeRecord', feeRecordSchema);
