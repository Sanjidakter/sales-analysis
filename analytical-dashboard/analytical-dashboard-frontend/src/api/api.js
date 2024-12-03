import axios from 'axios';

const API_BASE_URL = 'https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard';

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
