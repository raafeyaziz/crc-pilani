import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CRCDashboard from './pages/CRCDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Config from './pages/Config';
import MainMenu from './pages/MainMenu';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          
          <Route 
            path="/crc-dashboard" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <CRCDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/config" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Config />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/main-menu" 
            element={
              <ProtectedRoute>
                <MainMenu />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;