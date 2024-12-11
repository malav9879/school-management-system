const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    parentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    DOB: { type: Date, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
