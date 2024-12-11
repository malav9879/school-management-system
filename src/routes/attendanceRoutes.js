const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getAttendance,
    updateAttendance,
    deleteAttendance,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Only Admins and Teachers can mark attendance
router.post('/', protect, authorize('Admin', 'Teacher'), markAttendance);

// Only Admins, Teachers, and Parents can view attendance
router.get('/', protect, authorize('Admin', 'Teacher', 'Parent'), getAttendance);

// Only Admins can update or delete attendance
router.put('/:id', protect, authorize('Admin'), updateAttendance);
router.delete('/:id', protect, authorize('Admin'), deleteAttendance);

module.exports = router;
