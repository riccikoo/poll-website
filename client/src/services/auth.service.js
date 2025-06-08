import api from './api';

export const login = (data) =>
  api.post('/auth/login', data).then((res) => {
    localStorage.setItem('token', res.data.token);
    return res.data;
  });

export const register = (data) =>
  api.post('/auth/register', data);
