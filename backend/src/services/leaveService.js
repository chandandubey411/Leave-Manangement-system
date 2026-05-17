const Leave = require('../models/Leave');
const User = require('../models/User');
const calculateLeaveDays = require('../utils/calculateLeaveDays');

class LeaveService {
  /**
   * Create a new leave request for a user.
   * @param {string} userId - The ID of the employee applying for leave.
   * @param {Object} leaveData - The leave application data.
   * @returns {Promise<Object>} The created leave document.
   */
  async createLeaveRequest(userId, leaveData) {
    const { leaveType, startDate, endDate, reason, attachment } = leaveData;

    // 1. Validate past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    if (start < today) {
      throw new Error('Leave start date cannot be in the past');
    }

    if (new Date(endDate) < start) {
      throw new Error('End date cannot be before start date');
    }

    const totalDays = calculateLeaveDays(startDate, endDate);

    // 2. Validate leave balance
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.leaveBalance[leaveType] < totalDays) {
      throw new Error(`Insufficient ${leaveType} leave balance. You are requesting ${totalDays} days, but only have ${user.leaveBalance[leaveType]} days left.`);
    }

    // 3. Validate overlapping dates
    const overlappingLeave = await Leave.findOne({
      employee: userId,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (overlappingLeave) {
      throw new Error('You already have a pending or approved leave overlapping with these dates');
    }

    // 4. Create the request
    const leave = await Leave.create({
      employee: userId,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      attachment,
    });

    return leave;
  }

  /**
   * Get all leaves for a specific user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Array>} List of leave requests.
   */
  async getMyLeaves(userId) {
    return await Leave.find({ employee: userId }).sort({ createdAt: -1 });
  }

  /**
   * Get all leaves (for admin view).
   * @returns {Promise<Array>} List of all leave requests with employee details populated.
   */
  async getAllLeaves() {
    return await Leave.find()
      .populate('employee', 'fullName employeeId department')
      .sort({ createdAt: -1 });
  }

  /**
   * Get a specific leave request by ID.
   * @param {string} leaveId - The ID of the leave request.
   * @returns {Promise<Object>} The leave document.
   */
  async getLeaveById(leaveId) {
    const leave = await Leave.findById(leaveId).populate('employee', 'fullName employeeId department');
    if (!leave) {
      throw new Error('Leave request not found');
    }
    return leave;
  }

  /**
   * Update the status of a leave request (Approve/Reject).
   * @param {string} leaveId - The ID of the leave request.
   * @param {string} status - The new status ('approved' or 'rejected').
   * @param {string} adminComment - Optional comment from the admin.
   * @returns {Promise<Object>} The updated leave document.
   */
  async updateLeaveStatus(leaveId, status, adminComment) {
    const leave = await Leave.findById(leaveId).populate('employee');
    
    if (!leave) {
      throw new Error('Leave request not found');
    }

    if (leave.status !== 'pending') {
      throw new Error(`Cannot update a leave that is already ${leave.status}`);
    }

    leave.status = status;
    if (adminComment) {
      leave.adminComment = adminComment;
    }

    // If approved, deduct from leave balance
    if (status === 'approved') {
      const user = leave.employee;
      
      if (user.leaveBalance[leave.leaveType] < leave.totalDays) {
         throw new Error(`Cannot approve: Employee has insufficient ${leave.leaveType} leave balance`);
      }

      user.leaveBalance[leave.leaveType] -= leave.totalDays;
      await user.save();
    }

    await leave.save();
    return leave;
  }

  /**
   * Get dashboard analytics for admin.
   * @returns {Promise<Object>} Dashboard statistics, trends, and department distribution.
   */
  async getDashboardAnalytics() {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const pendingRequests = await Leave.countDocuments({ status: 'pending' });
    const approvedLeaves = await Leave.countDocuments({ status: 'approved' });
    const rejectedLeaves = await Leave.countDocuments({ status: 'rejected' });

    // Dummy data for charts (in a real app, this would be aggregated by dates)
    const trends = [
      { name: 'Jan', Approved: 4, Rejected: 1 },
      { name: 'Feb', Approved: 3, Rejected: 2 },
      { name: 'Mar', Approved: 6, Rejected: 1 },
      { name: 'Apr', Approved: 8, Rejected: 3 },
      { name: 'May', Approved: approvedLeaves, Rejected: rejectedLeaves },
    ];

    const departments = [
      { name: 'Engineering', value: 12 },
      { name: 'Design', value: 4 },
      { name: 'HR', value: 2 },
      { name: 'Marketing', value: 3 },
    ];

    return {
      stats: {
        totalEmployees,
        pendingRequests,
        approvedLeaves,
        rejectedLeaves,
      },
      trends,
      departments,
    };
  }
}

module.exports = new LeaveService();
