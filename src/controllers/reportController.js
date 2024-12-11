const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Grade = require('../models/Grade');
const FeeRecord = require('../models/FeeRecord');

// Get student performance report
const getStudentReport = async (req, res) => {
    const { studentID } = req.query;

    try {
        const grades = await Grade.find({ studentID }).populate('studentID', 'name class');
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get attendance report
const getAttendanceReport = async (req, res) => {
    const { studentID, date } = req.query;

    try {
        let attendance;
        if (studentID && date) {
            attendance = await Attendance.find({ studentID, date }).populate('studentID', 'name class');
        } else if (studentID) {
            attendance = await Attendance.find({ studentID }).populate('studentID', 'name class');
        } else {
            attendance = await Attendance.find().populate('studentID', 'name class');
        }

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get fee status report
const getFeeReport = async (req, res) => {
    const { studentID, status } = req.query;

    try {
        let fees;
        if (studentID && status) {
            fees = await FeeRecord.find({ studentID, status }).populate('studentID', 'name class');
        } else if (studentID) {
            fees = await FeeRecord.find({ studentID }).populate('studentID', 'name class');
        } else {
            fees = await FeeRecord.find().populate('studentID', 'name class');
        }

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStudentReport, getAttendanceReport, getFeeReport };
