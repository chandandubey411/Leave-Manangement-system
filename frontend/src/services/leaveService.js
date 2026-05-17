import apiClient from './apiClient';

export const fetchLeaveHistory = async () => {
  try {
    const res = await apiClient.get('/leaves/my');
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch leave history:', error);
    throw error;
  }
};

export const applyForLeave = async (leaveData) => {
  try {
    const isFormData = leaveData instanceof FormData;
    const res = await apiClient.post('/leaves', leaveData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return { success: true, message: res.data.message };
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.errors?.[0] || 'Failed to apply for leave';
    return { success: false, message };
  }
};
