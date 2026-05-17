const express = require('express');
const router = express.Router();

const { getAllEmployees } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.route('/')
  .get(protect, admin, getAllEmployees);

module.exports = router;
