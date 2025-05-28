import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { HelmetProvider } from 'react-helmet-async';
import Game from './Game';
import Auth from './components/auth/Auth';
import Profile from './components/profile/Profile';
import HighScores from './components/layout/HighScores';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SEO from './components/SEO';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth error:', error);
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGuestMode = () => {
    setIsGuest(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" text="Loading game..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return (
      <ErrorBoundary>
        <HelmetProvider>
          <SEO />
          <Auth 
            onClose={() => setUser(auth.currentUser)} 
            onGuestMode={handleGuestMode}
          />
        </HelmetProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <SEO />
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-purple-600">Grape Game</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowHighScores(true)}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  High Scores
                </button>
                {user && (
                  <>
                    <button
                      onClick={() => setShowProfile(true)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => auth.signOut()}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
                {isGuest && (
                  <button
                    onClick={() => setIsGuest(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
            <Game />
          </div>
          {showHighScores && (
            <HighScores onClose={() => setShowHighScores(false)} />
          )}
          {showProfile && (
            <Profile onClose={() => setShowProfile(false)} />
          )}
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
