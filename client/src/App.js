// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreatePollPage from './pages/CreatePoll';
import Home from './pages/Home';
import PollsList from './pages/PollsList';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsPage from './pages/AnalyticsPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/polls" element={
          <ProtectedRoute>
            <PollsList />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreatePollPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default App;
