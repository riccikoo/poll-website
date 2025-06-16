import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import PollCard from '../components/PollCard';
import PollForm from '../components/PollForm';
import { useAuth } from '../contexts/AuthContext';

function PollsList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPollForm, setShowPollForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { user, isAuthenticated } = useAuth();

  // Fetch polls from backend
  const fetchPolls = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/polls', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch polls');
      }

      const data = await response.json();
      setPolls(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const filteredPolls = polls.filter(poll => {
    switch (activeTab) {
      case 'active':
        return poll.status === 'active';
      case 'ended':
        return poll.status === 'ended';
      case 'my-polls':
        return isAuthenticated && poll.UserId === user?.id;
      default:
        return true;
    }
  });

  const renderHeader = () => (
    <div className="text-center py-12">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Explore Polls
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Discover and participate in polls created by the community
      </p>
      {isAuthenticated && (
        <Button size="lg" onClick={() => setShowPollForm(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
          Create New Poll
        </Button>
      )}
    </div>
  );

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 mb-8">
      {['all', 'active', 'ended', 'my-polls'].map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? 'primary' : 'outline'}
          onClick={() => setActiveTab(tab)}
          className="capitalize"
        >
          {tab.replace('-', ' ')}
        </Button>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading polls...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchPolls}>Try Again</Button>
        </div>
      );
    }

    if (filteredPolls.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No polls found</p>
          {isAuthenticated && (
            <Button onClick={() => setShowPollForm(true)}>Create Your First Poll</Button>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolls.map((poll) => (
          <PollCard 
            key={poll.id} 
            poll={poll} 
            onVote={fetchPolls}
            onDelete={fetchPolls}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation activeTab="polls" setActiveTab={setActiveTab} />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderHeader()}
          {renderFilters()}
          {renderContent()}
        </div>
      </main>

      {showPollForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-lg">
            <PollForm 
              onClose={() => setShowPollForm(false)} 
              onSuccess={() => {
                setShowPollForm(false);
                fetchPolls();
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PollsList;
