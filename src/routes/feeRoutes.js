const express = require('express');
const router = express.Router();
const {
    addFeeRecord,
    getFeeRecords,
    updateFeeRecord,
    deleteFeeRecord,
} = require('../controllers/feeController');

// Add a fee record
router.post('/', addFeeRecord);

// Get fee records
router.get('/', getFeeRecords);

// Update a fee record
router.put('/:id', updateFeeRecord);

// Delete a fee record
router.delete('/:id', deleteFeeRecord);

module.exports = router;
