const express = require('express');
const router = express.Router();
const { getStudentReport, getAttendanceReport, getFeeReport } = require('../controllers/reportController');

// Get student performance report
router.get('/student', getStudentReport);

// Get attendance report
router.get('/attendance', getAttendanceReport);

// Get fee status report
router.get('/fee', getFeeReport);

module.exports = router;
