import axios from 'axios';

// ✅ FIXED BASE URL (IMPORTANT)
const API_BASE_URL = "https://passportx-backend-1.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle response
api.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ================= AUTH =================
export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ================= APPLICATION =================
export const applicationService = {
  createApplication: () => api.post('/applications'),
  getApplications: () => api.get('/applications'),
  getApplication: (id) => api.get(`/applications/${id}`),
};

// ================= APPOINTMENT =================
export const appointmentService = {
  getAvailableSlots: (date) =>
    api.get(`/appointments/available-slots?date=${date}`),
};

export default api;