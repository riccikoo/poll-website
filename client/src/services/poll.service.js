import api from './api';

export const getPolls = () => api.get('/polls');
export const getPollById = (id) => api.get(`/polls/${id}`);
export const createPoll = (data) => api.post('/polls', data);
export const updatePoll = (id, data) => api.put(`/polls/${id}`, data);
export const deletePoll = (id) => api.delete(`/polls/${id}`);
