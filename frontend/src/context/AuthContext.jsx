import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshCsrfToken = async () => {
    const res = await api.get('/auth/csrf/');

    if (res.data.csrfToken) {
      api.defaults.headers.common['X-CSRFToken'] = res.data.csrfToken;
    }

    return res.data.csrfToken;
  };

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/user/');
      setUser(res.data);
      return res.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await refreshCsrfToken();
        await checkAuth();
      } catch (error) {
        console.error("Failed to initialize app", error);
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const loginWithGoogle = async (googleResponse) => {
    try {
      await api.post('/auth/google/', {
        access_token: googleResponse.access_token,
      });

      // Django may rotate the CSRF token during login.
      // Fetch the new token before any further POST/PUT/PATCH/DELETE.
      await refreshCsrfToken();

      const loggedInUser = await checkAuth();

      if (loggedInUser?.is_staff) {
        navigate('/crc-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error(
        "Django Auth Failed:",
        error.response?.data || error.message
      );
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout/');

      setUser(null);

      // Logout can also rotate/change CSRF state.
      await refreshCsrfToken();

      navigate('/');
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};