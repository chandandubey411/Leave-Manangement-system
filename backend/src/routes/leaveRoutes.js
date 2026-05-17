const express = require('express');
const router = express.Router();

const { 
  createLeaveRequest, 
  getMyLeaves, 
  getAllLeaves, 
  getLeaveById, 
  updateLeaveStatus,
  getDashboardAnalytics
} = require('../controllers/leaveController');

const { createLeaveValidation, updateStatusValidation } = require('../validators/leaveValidators');
const validate = require('../validators/validate');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Apply protection to all routes below
router.use(protect);

router.route('/')
  .post(upload.single('attachment'), createLeaveValidation, validate, createLeaveRequest)
  .get(admin, getAllLeaves); // Only admins can see all leaves

router.get('/analytics', admin, getDashboardAnalytics);

router.get('/my', getMyLeaves);

router.route('/:id')
  .get(getLeaveById);

router.route('/:id/status')
  .patch(admin, updateStatusValidation, validate, updateLeaveStatus); // Only admins can update status

module.exports = router;
