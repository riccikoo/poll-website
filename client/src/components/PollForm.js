import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const PollForm = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pollData, setPollData] = useState({
    question: '',
    description: '',
    choices: ['', ''],
    endDate: '',
  });

  const addOption = () => {
    setPollData(prev => ({
      ...prev,
      choices: [...prev.choices, '']
    }));
  };

  const removeOption = (index) => {
    setPollData(prev => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index)
    }));
  };

  const updateOption = (index, value) => {
    setPollData(prev => ({
      ...prev,
      choices: prev.choices.map((opt, i) => i === index ? value : opt)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Buat poll dulu
      const pollRes = await fetch('http://localhost:3001/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          question: pollData.question,
          description: pollData.description,
          endDate: pollData.endDate,
        })
      });

      if (!pollRes.ok) throw new Error('Failed to create poll');
      const poll = await pollRes.json();

      // 2. Tambahkan choices satu per satu
      for (const text of pollData.choices.filter(choice => choice.trim() !== '')) {
        await fetch(`http://localhost:3001/api/polls/${poll.id}/choices`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ text })
        });
      }

      // 3. Setelah semua choices ditambahkan, fetch ulang poll/choices
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/polls');
      }
    } catch (error) {
      console.error('Create poll error:', error);
      alert('Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-2xl p-8 sm:p-12 transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="question" className="block text-base font-semibold text-gray-200">
            Poll Question
          </label>
          <input
            type="text"
            id="question"
            value={pollData.question}
            onChange={(e) => setPollData(prev => ({ ...prev, question: e.target.value }))}
            className="mt-1 block w-full rounded-xl bg-gray-700/80 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 text-white shadow-sm transition-all duration-200 placeholder-gray-400 px-4 py-3 outline-none"
            placeholder="Enter your poll question"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-base font-semibold text-gray-200">
            Description
          </label>
          <textarea
            id="description"
            value={pollData.description}
            onChange={(e) => setPollData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-xl bg-gray-700/80 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 text-white shadow-sm transition-all duration-200 placeholder-gray-400 px-4 py-3 outline-none"
            placeholder="Enter poll description (optional)"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-200 mb-1">
            Choices
          </label>
          <div className="space-y-3">
            {pollData.choices.map((choice, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 rounded-xl bg-gray-700/80 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 text-white shadow-sm transition-all duration-200 placeholder-gray-400 px-4 py-3 outline-none"
                  placeholder={`Choice ${index + 1}`}
                  required
                />
                {pollData.choices.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Remove choice"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOption}
            className="mt-3 text-sm text-purple-400 hover:text-purple-300 flex items-center font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Choice
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-base font-semibold text-gray-200">
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            value={pollData.endDate}
            onChange={(e) => setPollData(prev => ({ ...prev, endDate: e.target.value }))}
            className="mt-1 block w-full rounded-xl bg-gray-700/80 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/40 text-white shadow-sm transition-all duration-200 placeholder-gray-400 px-4 py-3 outline-none"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onClose}
            disabled={loading}
            className="rounded-xl px-6 py-2 font-semibold border border-purple-500/40 hover:bg-purple-500/10 transition-all"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-2 font-semibold bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            {loading ? 'Creating...' : 'Create Poll'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PollForm; 