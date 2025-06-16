import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'; // npm install react-gauge-chart
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navigation from '../components/Navigation';


const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/analytics/summary', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (!data) return <div>No analytics data available.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation activeTab="analytics" />
      <div className="pt-20">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Polls" value={data.totalPolls} />
          <StatCard label="Total Votes" value={data.totalVotes} />
          <StatCard label="Total Users" value={data.totalUsers} />
          <StatCard label="Most Voted Poll" value={data.mostVotedPoll?.question || '-'} />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Votes per Choice (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.votesPerChoice}>
              <XAxis dataKey="choice" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Votes Distribution (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.votesPerChoice} dataKey="votes" nameKey="choice" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Votes Over Time (Line Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.votesOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="votes" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vote Target Achievement (Gauge)</h2>
          <GaugeChart id="gauge-chart" nrOfLevels={20} percent={data.voteTargetPercent || 0} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-gray-800 rounded-xl p-6 text-center shadow">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-gray-400">{label}</div>
  </div>
);

export default AnalyticsPage; 