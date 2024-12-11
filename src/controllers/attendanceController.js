const Attendance = require('../models/Attendance');
const { sendNotification } = require('../utils/notificationService');

// Mark attendance
const markAttendance = async (req, res) => {
    const { studentID, date, status } = req.body;

    try {
        const attendance = new Attendance({ studentID, date, status });
        await attendance.save();

        // Notify the parent if the student is absent
        if (status === 'Absent') {
            const student = await Student.findById(studentID).populate('parentID');
            await sendNotification(
                student.parentID._id,
                `${student.name} was marked absent on ${new Date(date).toDateString()}`,
                'Attendance'
            );
        }

        res.status(201).json({ message: 'Attendance marked successfully', attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get attendance records
const getAttendance = async (req, res) => {
    const { studentID, date } = req.query;

    try {
        let attendance;
        if (studentID && date) {
            attendance = await Attendance.find({ studentID, date });
        } else if (studentID) {
            attendance = await Attendance.find({ studentID });
        } else {
            attendance = await Attendance.find();
        }

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update attendance
const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const attendance = await Attendance.findByIdAndUpdate(id, updates, { new: true });
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });

        res.status(200).json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
    const { id } = req.params;

    try {
        const attendance = await Attendance.findByIdAndDelete(id);
        if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });

        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { markAttendance, getAttendance, updateAttendance, deleteAttendance };
