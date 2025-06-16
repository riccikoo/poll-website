import React, { useEffect, useState, useCallback } from 'react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const PollCard = ({ poll, onVote, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user?.id === poll?.UserId;
  const [choices, setChoices] = useState([]);
  const [votedChoiceId, setVotedChoiceId] = useState(null);

  // Gunakan useCallback agar dependency useEffect valid
  const fetchChoices = useCallback(() => {
    fetch(`http://localhost:3001/api/polls/${poll.id}/choices`)
      .then(res => res.json())
      .then(data => {
        setChoices(data);
        // Cek apakah user sudah vote
        const voted = data.find(choice => 
          choice.Votes && choice.Votes.some(vote => vote.UserId === user?.id)
        );
        setVotedChoiceId(voted ? voted.id : null);
      });
  }, [poll.id, user?.id]);

  useEffect(() => {
    fetchChoices();
  }, [fetchChoices]);

  const handleVote = async (choiceId) => {
    try {
      await api.post('/votes', { choiceId });
      fetchChoices();
      toast.success('Vote berhasil!');
      if (onVote) {
        onVote();
      }
    } catch (error) {
      toast.error('Gagal vote!');
      console.error('Vote error:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this poll?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/polls/${poll.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete poll');
      }

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (!poll) {
    return null;
  }

  const totalVotes = choices.reduce((sum, choice) => sum + (choice.Votes?.length || 0), 0);
  const status = poll.status || 'active';
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'ended':
        return 'text-red-400';
      case 'scheduled':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  console.log('PollCard data:', poll);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{poll.question}</CardTitle>
          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
            {formattedStatus}
          </span>
        </div>
        {poll.description && (
          <p className="text-sm text-gray-400 mt-1">{poll.description}</p>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mb-4">
          {choices.length > 0 ? (
            choices.map((choice) => (
              <div key={choice.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2">
                <span>{choice.text}</span>
                <Button 
                  size="sm" 
                  onClick={() => handleVote(choice.id)}
                  disabled={!!votedChoiceId}
                  className={votedChoiceId === choice.id ? 'bg-green-600 text-white' : ''}
                >
                  {votedChoiceId === choice.id ? (
                    <>
                      <span className="mr-1">✔</span> Voted
                    </>
                  ) : "Vote"}
                </Button>
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">Belum ada pilihan</div>
          )}
        </div>

        {votedChoiceId && (
          <div className="text-green-400 text-center mt-2 font-semibold">
            Anda sudah vote pada polling ini.
          </div>
        )}

        <div className="space-y-4">
          {poll.Choices?.map((choice) => (
            <div key={choice.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2">
              <span>{choice.text}</span>
              <Button 
                size="sm" 
                onClick={() => handleVote(choice.id)}
                disabled={!!votedChoiceId}
                className={votedChoiceId === choice.id ? 'bg-green-600 text-white' : ''}
              >
                {votedChoiceId === choice.id ? (
                  <>
                    <span className="mr-1">✔</span> Voted
                  </>
                ) : "Vote"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalVotes} votes
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDate(poll.endDate)}
            </span>
          </div>
          <span className="text-xs">Created {formatDate(poll.createdAt)}</span>
        </div>

        {isOwner && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
            >
              Delete Poll
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" size="sm">
            Share
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!poll.Choices || poll.Choices.length === 0}
            onClick={() => {
              if (!poll.Choices || poll.Choices.length === 0) return;
              if (poll.Choices.length === 1) {
                handleVote(poll.Choices[0].id);
              } else {
                const choiceText = poll.Choices.map((c, i) => `${i + 1}. ${c.text}`).join('\n');
                const input = prompt(`Pilih nomor pilihan:\n${choiceText}`);
                const idx = parseInt(input, 10) - 1;
                if (!isNaN(idx) && poll.Choices[idx]) {
                  handleVote(poll.Choices[idx].id);
                }
              }
            }}
          >
            Vote
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PollCard; 