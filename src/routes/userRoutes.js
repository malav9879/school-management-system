const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/UserController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', protect, authorize('Admin'), registerUser);

// Login a user
router.post('/login', loginUser);

module.exports = router;
