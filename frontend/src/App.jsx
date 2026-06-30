import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CRCDashboard from './pages/CRCDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Config from './pages/Config';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* REGULAR STUDENT ROUTE */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          {/* STRICT CRC ADMIN ROUTE */}
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;