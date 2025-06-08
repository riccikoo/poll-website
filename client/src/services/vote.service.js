import api from './api';

export const submitVote = (choiceId) =>
  api.post('/votes', { choiceId });
