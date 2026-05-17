const leaveService = require('../services/leaveService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

exports.createLeaveRequest = asyncHandler(async (req, res) => {
  const leaveData = { ...req.body };
  if (req.file) {
    leaveData.attachment = req.file.filename;
  }
  const leave = await leaveService.createLeaveRequest(req.user._id, leaveData);
  return successResponse(res, 201, 'Leave request submitted successfully', leave);
});

exports.getMyLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.getMyLeaves(req.user._id);
  return successResponse(res, 200, 'Leaves retrieved successfully', leaves);
});

exports.getAllLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.getAllLeaves();
  return successResponse(res, 200, 'All leaves retrieved successfully', leaves);
});

exports.getLeaveById = asyncHandler(async (req, res) => {
  const leave = await leaveService.getLeaveById(req.params.id);
  
  // Authorization check: Only admin or the employee who created it can view
  if (req.user.role !== 'admin' && leave.employee._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this leave request');
  }

  return successResponse(res, 200, 'Leave retrieved successfully', leave);
});

exports.updateLeaveStatus = asyncHandler(async (req, res) => {
  const { status, adminComment } = req.body;
  try {
    const leave = await leaveService.updateLeaveStatus(req.params.id, status, adminComment);
    return successResponse(res, 200, `Leave request ${status} successfully`, leave);
  } catch (error) {
    res.status(400);
    throw error;
  }
});

exports.getDashboardAnalytics = asyncHandler(async (req, res) => {
  const data = await leaveService.getDashboardAnalytics();
  return successResponse(res, 200, 'Dashboard analytics retrieved successfully', data);
});
