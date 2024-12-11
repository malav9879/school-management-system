const express = require('express');
const router = express.Router();
const {
    addGrade,
    getGrades,
    updateGrade,
    deleteGrade,
} = require('../controllers/gradeController');

// Add a grade
router.post('/', addGrade);

// Get grades
router.get('/', getGrades);

// Update a grade
router.put('/:id', updateGrade);

// Delete a grade
router.delete('/:id', deleteGrade);

module.exports = router;
