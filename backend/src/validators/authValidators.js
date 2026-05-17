const { body } = require('express-validator');

exports.registerValidation = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required'),
  body('department')
    .notEmpty()
    .withMessage('Department is required'),
  body('designation')
    .notEmpty()
    .withMessage('Designation is required'),
];

exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];
