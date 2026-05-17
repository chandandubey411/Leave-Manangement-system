const { body } = require('express-validator');

exports.createLeaveValidation = [
  body('leaveType')
    .isIn(['casual', 'sick', 'earned'])
    .withMessage('Invalid leave type. Must be casual, sick, or earned'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error('End date must be after or equal to start date');
      }
      return true;
    }),
  body('reason')
    .notEmpty()
    .withMessage('Reason is required')
    .isLength({ max: 500 })
    .withMessage('Reason cannot exceed 500 characters'),
];

exports.updateStatusValidation = [
  body('status')
    .isIn(['approved', 'rejected'])
    .withMessage('Status must be either approved or rejected'),
  body('adminComment')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Admin comment cannot exceed 500 characters'),
];
