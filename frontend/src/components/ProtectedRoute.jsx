import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useContext(AuthContext);

  // Still fetching the session
  if (loading) return <div className="h-screen w-screen bg-black text-white p-10 font-geist">&gt; verifying_clearance...</div>;

  // Not logged in? Kick to login screen.
  if (!user) return <Navigate to="/" />;

  // Needs admin, but user is a regular student? Kick to student dashboard.
  if (requireAdmin && !user.is_staff) {
    return <Navigate to="/student-dashboard" />;
  }

  // Passed all checks? Let them in.
  return children;
};

export default ProtectedRoute;