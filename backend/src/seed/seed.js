require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Leave = require('../models/Leave');
const connectDB = require('../database/connectDB');

const importData = async () => {
  try {
    await connectDB();

    // Clear DB
    await User.deleteMany();
    await Leave.deleteMany();

    console.log('Data Cleared!');

    const adminUser = {
      fullName: 'System Admin',
      email: 'admin@company.com',
      password: 'admin@123',
      role: 'admin',
      employeeId: 'ADM-001',
      department: 'Management',
      designation: 'System Administrator',
    };

    const employees = [
      {
        fullName: 'John Doe',
        email: 'john@company.com',
        password: 'password123',
        employeeId: 'EMP-001',
        department: 'Engineering',
        designation: 'Frontend Developer',
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@company.com',
        password: 'password123',
        employeeId: 'EMP-002',
        department: 'Design',
        designation: 'UI/UX Designer',
      },
      {
        fullName: 'Mike Johnson',
        email: 'mike@company.com',
        password: 'password123',
        employeeId: 'EMP-003',
        department: 'Engineering',
        designation: 'Backend Developer',
      },
      {
        fullName: 'Sarah Williams',
        email: 'sarah@company.com',
        password: 'password123',
        employeeId: 'EMP-004',
        department: 'HR',
        designation: 'HR Manager',
      },
    ];

    const createdUsers = await User.insertMany([adminUser, ...employees]);
    console.log('Users Imported!');

    // Create some mock leaves for the first employee
    const employee1 = createdUsers[1]._id; // John Doe
    
    const mockLeaves = [
      {
        employee: employee1,
        leaveType: 'casual',
        startDate: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
        totalDays: 3,
        reason: 'Family function',
        status: 'pending',
      },
      {
        employee: employee1,
        leaveType: 'sick',
        startDate: new Date(new Date().setDate(new Date().getDate() - 10)), // 10 days ago
        endDate: new Date(new Date().setDate(new Date().getDate() - 9)), // 9 days ago
        totalDays: 2,
        reason: 'Viral fever',
        status: 'approved',
        adminComment: 'Get well soon',
      }
    ];

    await Leave.insertMany(mockLeaves);
    console.log('Leaves Imported!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Add destroy data logic here if needed
} else {
  importData();
}
