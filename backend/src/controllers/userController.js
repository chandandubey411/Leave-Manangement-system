const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

exports.getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: 'employee' }).select('-password').sort({ createdAt: -1 });
  
  // Format for the admin panel
  const formattedEmployees = employees.map(emp => ({
    id: emp.employeeId,
    name: emp.fullName,
    email: emp.email,
    department: emp.department,
    designation: emp.designation,
    totalLeaves: 42, // Default total leaves allocated (12 casual + 12 sick + 18 earned)
    remainingLeaves: emp.leaveBalance.casual + emp.leaveBalance.sick + emp.leaveBalance.earned,
  }));

  return successResponse(res, 200, 'Employees retrieved successfully', formattedEmployees);
});
