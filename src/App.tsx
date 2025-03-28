import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import UserList from './pages/UserList';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } />
          <Route path="/users/:id/edit" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;