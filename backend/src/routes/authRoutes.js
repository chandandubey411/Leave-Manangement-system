const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidators');
const validate = require('../validators/validate');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
router.get('/me', protect, getUserProfile);

module.exports = router;
