import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Button from './components/Button';
import Card, { CardHeader, CardTitle, CardContent } from './components/Card';
import PollCard from './components/PollCard';
import PollForm from './components/PollForm';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPollForm, setShowPollForm] = useState(false);

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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Hero Section */}
            <div className="text-center py-20">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Create Engaging Polls
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Design beautiful, interactive polls that drive engagement and gather valuable insights.
              </p>
              <Button size="lg" onClick={() => setShowPollForm(true)}>
                Create New Poll
              </Button>
            </div>

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
      case 'polls':
        return (
          <div className="py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">All Polls</h2>
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

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-lg border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PollMaster</h3>
              <p className="text-gray-400">Create engaging polls that drive results.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Enterprise</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 PollMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
