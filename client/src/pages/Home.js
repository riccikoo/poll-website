import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Button from "../components/Button";
import Card, { CardTitle, CardContent } from "../components/Card";
import PollCard from "../components/PollCard";
import PollForm from "../components/PollForm";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const [activeTab, setActiveTab] = useState("polls");
  const [showPollForm, setShowPollForm] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const samplePolls = [
    {
      id: 1,
      title: 'Best Programming Language 2024',
      description: 'Vote for your favorite programming language of 2024',
      options: [
        { text: 'JavaScript', votes: 150 },
        { text: 'Python', votes: 120 },
        { text: 'TypeScript', votes: 80 },
        { text: 'Rust', votes: 50 }
      ],
      totalVotes: 400,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: 2,
      title: 'Favorite Frontend Framework',
      description: 'Which frontend framework do you prefer for your projects?',
      options: [
        { text: 'React', votes: 200 },
        { text: 'Vue', votes: 150 },
        { text: 'Angular', votes: 100 }
      ],
      totalVotes: 450,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: 3,
      title: 'Best Database Solution',
      description: 'Choose your preferred database solution for modern applications',
      options: [
        { text: 'PostgreSQL', votes: 180 },
        { text: 'MongoDB', votes: 120 },
        { text: 'MySQL', votes: 100 },
        { text: 'Redis', votes: 50 }
      ],
      totalVotes: 450,
      endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'ended'
    }
  ];

  const renderHero = () => {
    if (isAuthenticated && user) {
      return (
        <div className="text-center py-20">
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || user.email)}&background=6D28D9&color=fff&size=128`}
              alt="avatar"
              className="w-24 h-24 rounded-full shadow-lg border-4 border-purple-500 mb-2"
            />
            <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 shadow">Logged In</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Welcome, {user.username || user.email}!
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            You are now logged in. Create, manage, and analyze your polls with advanced features and real-time analytics!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setActiveTab('create')} className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              Create New Poll
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Create Engaging Polls
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Design beautiful, interactive polls that drive engagement and gather valuable insights.
          </p>
          <Button size="lg" onClick={() => setActiveTab('create')}>
            Try Now - Create New Poll
          </Button>
        </div>
      );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'polls':
        return (
          <>
            {renderHero()}
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {[
                {
                  title: 'Real-time Results',
                  description: 'Watch your poll results update in real-time with beautiful visualizations.',
                  icon: '📊'
                },
                {
                  title: 'Customizable Design',
                  description: 'Create polls that match your brand with our advanced customization options.',
                  icon: '🎨'
                },
                {
                  title: 'Advanced Analytics',
                  description: 'Get deep insights into your poll results with our powerful analytics tools.',
                  icon: '📈'
                }
              ].map((feature) => (
                <Card key={feature.title}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Polls Section */}
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Recent Polls</h2>
                <Button variant="outline" onClick={() => setShowPollForm(true)}>
                  Create New Poll
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {samplePolls.map((poll) => (
                  <PollCard key={poll.id} poll={poll} />
                ))}
              </div>
            </div>
          </>
        );
      case 'create':
        return (
          <div className="py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Create New Poll</h2>
              <Button variant="outline" onClick={() => setShowPollForm(false)}>
                Cancel
              </Button>
            </div>
            <PollForm />
          </div>
        );
      case 'analytics':
        return (
          <div className="py-8">
            <h2 className="text-3xl font-bold mb-8">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardTitle>Total Polls</CardTitle>
                <CardContent>
                  <p className="text-4xl font-bold text-purple-500">{samplePolls.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardTitle>Active Polls</CardTitle>
                <CardContent>
                  <p className="text-4xl font-bold text-green-500">
                    {samplePolls.filter(poll => poll.status === 'active').length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardTitle>Total Votes</CardTitle>
                <CardContent>
                  <p className="text-4xl font-bold text-blue-500">
                    {samplePolls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardTitle>Average Participation</CardTitle>
                <CardContent>
                  <p className="text-4xl font-bold text-yellow-500">
                    {Math.round(samplePolls.reduce((sum, poll) => sum + poll.totalVotes, 0) / samplePolls.length)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
      {showPollForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-lg">
            <PollForm onClose={() => setShowPollForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
