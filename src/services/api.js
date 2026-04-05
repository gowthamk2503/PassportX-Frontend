import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Application Services
export const applicationService = {
  createApplication: () => api.post('/applications'),
  getApplications: () => api.get('/applications'),
  getApplication: (applicationId) => api.get(`/applications/${applicationId}`),
  updateStep: (applicationId, step, data) =>
    api.patch(`/applications/${applicationId}/step`, { step, data }),
  submitApplication: (applicationId) =>
    api.post(`/applications/${applicationId}/submit`),
  uploadDocument: (applicationId, file, docType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('docType', docType);
    return api.post(`/applications/${applicationId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  generatePDF: (applicationId) =>
    api.post(`/applications/${applicationId}/generate-pdf`),
  downloadPDF: async (applicationId, fileName) => {
    try {
      const response = await api.get(`/applications/${applicationId}/download/${fileName}`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(error.response.data?.message || 'PDF not found. Try regenerating.');
      }
      throw error;
    }
  },
  updateApplication: (applicationId, data) =>
    api.put(`/applications/${applicationId}`, data)
};

// Appointment Services
export const appointmentService = {
  getAvailableSlots: (date) =>
    api.get('/appointments/available-slots', { params: { date } }),
  bookAppointment: (applicationId, data) =>
    api.post(`/appointments/${applicationId}/book`, data),
  getAppointments: () => api.get('/appointments'),
  cancelAppointment: (appointmentId) =>
    api.patch(`/appointments/${appointmentId}/cancel`)
};

export default api;
