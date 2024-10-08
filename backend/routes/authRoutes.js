const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/', loginUser);
router.get('/profile', protect, getUserProfile); // New route to fetch user profile

module.exports = router;
