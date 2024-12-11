const Student = require('../models/Student');

// Add a new student
const addStudent = async (req, res) => {
    const { name, class: studentClass, parentID, DOB } = req.body;

    try {
        const student = new Student({ name, class: studentClass, parentID, DOB });
        await student.save();
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all students or specific student
const getStudents = async (req, res) => {
    const { id } = req.query;

    try {
        const students = id ? await Student.findById(id).populate('parentID') : await Student.find().populate('parentID');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update student information
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const student = await Student.findByIdAndUpdate(id, updates, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addStudent, getStudents, updateStudent, deleteStudent };
