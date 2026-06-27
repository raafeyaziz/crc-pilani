import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const api = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials: true,            
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Ask Django for the token
        const res = await api.get('/auth/csrf/');
        
        // 2. THE SILVER BULLET: 
        // Manually weld the token to all future requests. Do not rely on the browser.
        if (res.data.csrfToken) {
          api.defaults.headers.common['X-CSRFToken'] = res.data.csrfToken;
        }
        
        // 3. Now check if logged in
        await checkAuth();
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    };

    initializeApp();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/user/'); 
      setUser(res.data);
    } catch (error) {
      setUser(null); 
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (googleResponse) => {
    try {
      const res = await api.post('/auth/google/', {
        access_token: googleResponse.access_token,
      });

      await checkAuth();
      const userRes= await api.get('/auth/user');
      if (userRes.data.is_staff){
        navigate('/crc-dashboard');
      }
      else navigate('/student-dashboard');
    } catch (error) {
      console.error("Django Auth Failed:", error.response?.data || error.message);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout/');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};