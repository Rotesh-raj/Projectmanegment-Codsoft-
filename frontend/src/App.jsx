import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-8 overflow-auto">
            <Dashboard />
          </main>
        </div></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-8 overflow-auto">
            Projects Page
          </main>
        </div></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-8 overflow-auto">
            Tasks Page
          </main>
        </div></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
