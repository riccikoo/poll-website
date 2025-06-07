import React, { createContext, useContext, useState, useCallback } from 'react';
import { pollService, choiceService } from '../services/api';
import { toast } from 'react-hot-toast';

const PollContext = createContext(null);

export const PollProvider = ({ children }) => {
  const [polls, setPolls] = useState([]);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
  });

  const fetchPolls = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await pollService.getAllPolls(filters);
      setPolls(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch polls');
      toast.error('Failed to fetch polls');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchPollById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await pollService.getPollById(id);
      setCurrentPoll(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch poll');
      toast.error('Failed to fetch poll details');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPoll = async (pollData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await pollService.createPoll(pollData);
      setPolls(prev => [response.data, ...prev]);
      toast.success('Poll created successfully! 🎉');
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create poll');
      toast.error('Failed to create poll');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePoll = async (id, pollData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await pollService.updatePoll(id, pollData);
      setPolls(prev => prev.map(poll => 
        poll.id === id ? response.data : poll
      ));
      if (currentPoll?.id === id) {
        setCurrentPoll(response.data);
      }
      toast.success('Poll updated successfully! ✨');
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update poll');
      toast.error('Failed to update poll');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePoll = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await pollService.deletePoll(id);
      setPolls(prev => prev.filter(poll => poll.id !== id));
      if (currentPoll?.id === id) {
        setCurrentPoll(null);
      }
      toast.success('Poll deleted successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete poll');
      toast.error('Failed to delete poll');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const vote = async (pollId, choiceId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await pollService.vote(pollId, choiceId);
      setPolls(prev => prev.map(poll => 
        poll.id === pollId ? response.data : poll
      ));
      if (currentPoll?.id === pollId) {
        setCurrentPoll(response.data);
      }
      toast.success('Vote recorded successfully! 🎉');
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to record vote');
      toast.error('Failed to record vote');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addChoice = async (pollId, choiceData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await choiceService.addChoice(pollId, choiceData);
      if (currentPoll?.id === pollId) {
        setCurrentPoll(prev => ({
          ...prev,
          choices: [...prev.choices, response.data]
        }));
      }
      toast.success('Choice added successfully! ✨');
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add choice');
      toast.error('Failed to add choice');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateChoice = async (pollId, choiceId, choiceData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await choiceService.updateChoice(pollId, choiceId, choiceData);
      if (currentPoll?.id === pollId) {
        setCurrentPoll(prev => ({
          ...prev,
          choices: prev.choices.map(choice => 
            choice.id === choiceId ? response.data : choice
          )
        }));
      }
      toast.success('Choice updated successfully! ✨');
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update choice');
      toast.error('Failed to update choice');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteChoice = async (pollId, choiceId) => {
    try {
      setLoading(true);
      setError(null);
      await choiceService.deleteChoice(pollId, choiceId);
      if (currentPoll?.id === pollId) {
        setCurrentPoll(prev => ({
          ...prev,
          choices: prev.choices.filter(choice => choice.id !== choiceId)
        }));
      }
      toast.success('Choice deleted successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete choice');
      toast.error('Failed to delete choice');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const value = {
    polls,
    currentPoll,
    loading,
    error,
    filters,
    fetchPolls,
    fetchPollById,
    createPoll,
    updatePoll,
    deletePoll,
    vote,
    addChoice,
    updateChoice,
    deleteChoice,
    updateFilters,
  };

  return (
    <PollContext.Provider value={value}>
      {children}
    </PollContext.Provider>
  );
};

export const usePoll = () => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePoll must be used within a PollProvider');
  }
  return context;
};

export default PollContext; 