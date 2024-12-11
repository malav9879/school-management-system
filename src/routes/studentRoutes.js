const express = require('express');
const router = express.Router();
const { addStudent, getStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

// Add a new student
router.post('/', addStudent);

// Get all students or specific student
router.get('/', getStudents);

// Update student information
router.put('/:id', updateStudent);

// Delete a student
router.delete('/:id', deleteStudent);

module.exports = router;
