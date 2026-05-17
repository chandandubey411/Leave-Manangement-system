import apiClient from './apiClient';

export const fetchAllLeaveRequests = async () => {
  try {
    const res = await apiClient.get('/leaves');
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch leave requests:', error);
    throw error;
  }
};

export const updateLeaveStatus = async (id, status, adminComment = '') => {
  try {
    const res = await apiClient.patch(`/leaves/${id}/status`, { status, adminComment });
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Failed to update leave status:', error);
    const message = error.response?.data?.message || 'Update failed';
    return { success: false, message };
  }
};

export const fetchEmployees = async () => {
  try {
    const res = await apiClient.get('/users');
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    throw error;
  }
};

export const fetchDashboardAnalytics = async () => {
  try {
    const res = await apiClient.get('/leaves/analytics');
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch dashboard analytics:', error);
    throw error;
  }
};
