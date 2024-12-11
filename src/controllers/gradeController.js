const Grade = require('../models/Grade');
const { sendNotification } = require('../utils/notificationService');

// Add a grade
const addGrade = async (req, res) => {
    const { studentID, subject, score } = req.body;

    try {
        const grade = new Grade({ studentID, subject, score });
        await grade.save();

        // Notify the parent about the grade update
        const student = await Student.findById(studentID).populate('parentID');
        await sendNotification(
            student.parentID._id,
            `${student.name} received a score of ${score} in ${subject}`,
            'GradeUpdate'
        );

        res.status(201).json({ message: 'Grade added successfully', grade });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get grades
const getGrades = async (req, res) => {
    const { studentID, subject } = req.query;

    try {
        let grades;
        if (studentID && subject) {
            grades = await Grade.find({ studentID, subject });
        } else if (studentID) {
            grades = await Grade.find({ studentID });
        } else {
            grades = await Grade.find();
        }

        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a grade
const updateGrade = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const grade = await Grade.findByIdAndUpdate(id, updates, { new: true });
        if (!grade) return res.status(404).json({ message: 'Grade not found' });

        res.status(200).json({ message: 'Grade updated successfully', grade });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a grade
const deleteGrade = async (req, res) => {
    const { id } = req.params;

    try {
        const grade = await Grade.findByIdAndDelete(id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });

        res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addGrade, getGrades, updateGrade, deleteGrade };
