import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import Favorites from './components/Favorites';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import OAuthCallback from './components/OAuthCallback';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<NewsList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/favorites" element={
                  <ProtectedRoute><Favorites /></ProtectedRoute>
                } />
              </Routes>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
