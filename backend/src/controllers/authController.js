const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const generateToken = require('../utils/generateToken');

exports.registerUser = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  
  if (user) {
    generateToken(res, user._id);
    return successResponse(res, 201, 'User registered successfully', user);
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await authService.loginUser(email, password);
  
  if (user) {
    const token = generateToken(res, user._id);
    return successResponse(res, 200, 'Login successful', { ...user, token });
  }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  return successResponse(res, 200, 'Profile retrieved', user);
});
