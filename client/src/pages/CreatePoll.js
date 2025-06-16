import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PollForm from '../components/PollForm';

const CreatePollPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/polls');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation activeTab="create" />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Animated Background */}
          <div className="relative overflow-hidden rounded-2xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-gradient-x" />
            <div className="relative px-8 py-16 sm:px-16 sm:py-24">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                  Create New Poll
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Design your poll with a clear question and engaging choices. Set an end date to keep the excitement going!
                </p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-purple-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Clear Questions</h3>
              <p className="text-gray-400">Make your question specific and easy to understand for better engagement.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-purple-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Meaningful Choices</h3>
              <p className="text-gray-400">Provide clear and distinct options that cover all possible answers.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-purple-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Set Time Limit</h3>
              <p className="text-gray-400">Choose an appropriate end date to create urgency and encourage participation.</p>
            </div>
          </div>

          {/* Form Section with Glass Effect */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <PollForm 
              onClose={() => navigate('/polls')}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </main>

      {/* Add custom styles for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default CreatePollPage;
