const User = require('../models/User');

class AuthService {
  async registerUser(userData) {
    const { email, employeeId } = userData;

    // Check if user exists by email or employeeId
    const userExists = await User.findOne({
      $or: [{ email }, { employeeId }]
    });

    if (userExists) {
      throw new Error('User with this email or employee ID already exists');
    }

    const user = await User.create(userData);

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      department: user.department,
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid email or password');
    }

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      designation: user.designation,
      leaveBalance: user.leaveBalance,
      avatar: user.avatar,
    };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService();
