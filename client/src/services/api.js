import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log('Making request to:', config.url);
  console.log('Request config:', config);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  async (error) => {
    console.error('API Error:', error);
    console.error('Error config:', error.config);
    console.error('Error response:', error.response);
    
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/auth/refresh', { refreshToken });
        const { token } = response.data;
        
        localStorage.setItem('token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token failure
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (email, password) => {
    console.log('Form submitted:', { email, password });
    return api.post('/auth/login', { email, password }).then(res => res.data);
  },
  register: (userData) => api.post('/auth/register', userData).then(res => res.data),
  logout: () => api.post('/auth/logout').then(res => res.data),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }).then(res => res.data),
  getProfile: () => api.get('/user/me').then(res => res.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(res => res.data),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }).then(res => res.data),
};

// Poll Services
export const pollService = {
  getAllPolls: (params) => api.get('/polls', { params }).then(res => res.data),
  getPollById: (id) => api.get(`/polls/${id}`).then(res => res.data),
  createPoll: (pollData) => api.post('/polls', pollData).then(res => res.data),
  updatePoll: (id, pollData) => api.put(`/polls/${id}`, pollData).then(res => res.data),
  deletePoll: (id) => api.delete(`/polls/${id}`).then(res => res.data),
  vote: (choiceId) => api.post(`/votes`, { choiceId }).then(res => res.data),
};

// Choice Services
export const choiceService = {
  getChoices: (pollId) => api.get(`/polls/${pollId}/choices`).then(res => res.data),
  addChoice: (pollId, choiceData) => api.post(`/polls/${pollId}/choices`, choiceData).then(res => res.data),
  updateChoice: (pollId, choiceId, choiceData) => 
    api.put(`/polls/${pollId}/choices/${choiceId}`, choiceData).then(res => res.data),
  deleteChoice: (pollId, choiceId) => 
    api.delete(`/polls/${pollId}/choices/${choiceId}`).then(res => res.data),
};

// Analytics Services
export const analyticsService = {
  getPollAnalytics: (pollId) => api.get(`/analytics/polls/${pollId}`).then(res => res.data),
  getUserAnalytics: () => api.get('/analytics/user').then(res => res.data),
  getGlobalAnalytics: () => api.get('/analytics/global').then(res => res.data),
};

export default api; 