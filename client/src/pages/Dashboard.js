import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import PollCard from "../components/PollCard";
import PollForm from "../components/PollForm";
import { UserCircleIcon, ChartBarIcon, ClipboardDocumentListIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const samplePolls = [
  {
    title: "Best Programming Language 2024",
    description: "Vote for your favorite programming language!",
    options: [
      { text: "JavaScript", votes: 120 },
      { text: "Python", votes: 95 },
      { text: "Go", votes: 40 },
    ],
    totalVotes: 255,
    endDate: new Date(Date.now() + 86400000),
    createdAt: new Date(Date.now() - 86400000),
    status: "active",
  },
  {
    title: "Best Frontend Framework",
    description: "Choose the frontend framework you love the most!",
    options: [
      { text: "React", votes: 200 },
      { text: "Vue", votes: 80 },
      { text: "Svelte", votes: 30 },
    ],
    totalVotes: 310,
    endDate: new Date(Date.now() + 172800000),
    createdAt: new Date(Date.now() - 43200000),
    status: "active",
  },
];

const stats = [
  {
    label: "Total Polls",
    value: 12,
    icon: <ClipboardDocumentListIcon className="w-7 h-7 text-blue-400" />,
    color: "from-blue-700 to-blue-500"
  },
  {
    label: "Total Votes",
    value: 565,
    icon: <ChartBarIcon className="w-7 h-7 text-purple-400" />,
    color: "from-purple-700 to-purple-500"
  },
  {
    label: "Active Polls",
    value: 3,
    icon: <PlusCircleIcon className="w-7 h-7 text-green-400" />,
    color: "from-green-700 to-green-500"
  },
];

const sidebarMenu = [
  { name: "Dashboard", icon: <ChartBarIcon className="w-6 h-6" />, path: "/dashboard" },
  { name: "Polls", icon: <ClipboardDocumentListIcon className="w-6 h-6" />, path: "/polls" },
  { name: "Create", icon: <PlusCircleIcon className="w-6 h-6" />, path: "/create" },
];

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-20 bg-black/90 border-r border-gray-800 py-8 px-2 min-h-screen sticky top-0 z-30 items-center gap-8">
        <a href="/dashboard" className="mb-8">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">PM</span>
        </a>
        <nav className="flex flex-col gap-6 w-full items-center">
          {sidebarMenu.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setActiveMenu(item.name)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl font-medium transition-all duration-200 text-xs ${
                activeMenu === item.name
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-center gap-2 p-2 bg-gray-800/80 rounded-xl">
          <UserCircleIcon className="w-8 h-8 text-purple-400" />
          <div className="text-xs text-gray-400">Guest</div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="h-16 bg-black/70 border-b border-gray-800 flex items-center px-6 justify-between sticky top-0 z-20 shadow-lg">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">PollMaster</div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" className="border-purple-500 text-purple-300">Upgrade VIP</Button>
            <UserCircleIcon className="w-8 h-8 text-purple-400" />
          </div>
        </nav>
        {/* Content */}
        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          {/* Statistik Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <Card key={idx} className={`flex items-center gap-4 p-6 bg-gradient-to-br ${stat.color} shadow-xl border-0 hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200`} hover={false}>
                <div className="p-3 rounded-full bg-black/30">
                  {stat.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-2xl font-bold drop-shadow-lg">{stat.value}</div>
                  <div className="text-sm text-gray-200 font-medium mt-1">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">Create Engaging Polls</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">Design beautiful, interactive polls that drive engagement and gather valuable insights. Experience the next level of polling with VIP features and analytics.</p>
          </div>
          {/* Poll Form & Poll List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Button size="lg" className="w-full mb-6 bg-gradient-to-r from-blue-500 to-purple-600" onClick={() => setShowForm((v) => !v)}>
                {showForm ? "Close Poll Form" : "Create New Poll"}
              </Button>
              {showForm && <PollForm />}
            </div>
            <div className="space-y-6">
              {samplePolls.map((poll, idx) => (
                <PollCard key={idx} poll={poll} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 