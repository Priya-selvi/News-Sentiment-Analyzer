import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function OAuthCallback() {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    const userStr = params.get('user');
    const error = params.get('error');

    if (error || !token || !userStr) {
      navigate('/login?error=oauth_failed');
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      login(token, user);
      navigate('/');
    } catch {
      navigate('/login?error=oauth_failed');
    }
  }, []);

  return (
    <div className="loader" style={{ minHeight: '100vh' }}>
      <div className="spinner"></div>
    </div>
  );
}

export default OAuthCallback;
