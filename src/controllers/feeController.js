const FeeRecord = require('../models/FeeRecord');
const { sendNotification } = require('../utils/notificationService');

// Add a fee record
const addFeeRecord = async (req, res) => {
    const { studentID, amount, dueDate, status } = req.body;

    try {
        const feeRecord = new FeeRecord({ studentID, amount, dueDate, status });
        await feeRecord.save();

        // Notify the parent if the fee is unpaid
        if (status === 'Unpaid') {
            const student = await Student.findById(studentID).populate('parentID');
            await sendNotification(
                student.parentID._id,
                `A fee of $${amount} is due on ${new Date(dueDate).toDateString()}`,
                'FeeReminder'
            );
        }

        res.status(201).json({ message: 'Fee record added successfully', feeRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get fee records
const getFeeRecords = async (req, res) => {
    const { studentID, status } = req.query;

    try {
        let feeRecords;
        if (studentID && status) {
            feeRecords = await FeeRecord.find({ studentID, status });
        } else if (studentID) {
            feeRecords = await FeeRecord.find({ studentID });
        } else {
            feeRecords = await FeeRecord.find();
        }

        res.status(200).json(feeRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a fee record
const updateFeeRecord = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const feeRecord = await FeeRecord.findByIdAndUpdate(id, updates, { new: true });
        if (!feeRecord) return res.status(404).json({ message: 'Fee record not found' });

        res.status(200).json({ message: 'Fee record updated successfully', feeRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a fee record
const deleteFeeRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const feeRecord = await FeeRecord.findByIdAndDelete(id);
        if (!feeRecord) return res.status(404).json({ message: 'Fee record not found' });

        res.status(200).json({ message: 'Fee record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addFeeRecord, getFeeRecords, updateFeeRecord, deleteFeeRecord };
