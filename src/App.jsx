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
import AdSpace from './components/ads/AdSpace';

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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-purple-600">Grape Game</h1>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => setShowHighScores(true)}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm sm:text-base"
                >
                  High Scores
                </button>
                {user && (
                  <>
                    <button
                      onClick={() => setShowProfile(true)}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => auth.signOut()}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm sm:text-base"
                    >
                      Logout
                    </button>
                  </>
                )}
                {isGuest && (
                  <button
                    onClick={() => setIsGuest(false)}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>

            {/* Top Ad Space */}
            <div className="mb-8">
              <AdSpace position="top" className="max-w-3xl mx-auto" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar Ad */}
              <div className="hidden lg:block w-[300px] flex-shrink-0">
                <AdSpace position="sidebar-left" className="sticky top-8" />
              </div>

              {/* Main Game Area */}
              <div className="flex-grow">
                <Game />
              </div>

              {/* Right Sidebar Ad */}
              <div className="hidden lg:block w-[300px] flex-shrink-0">
                <AdSpace position="sidebar-right" className="sticky top-8" />
              </div>
            </div>

            {/* Bottom Ad Space */}
            <div className="mt-8">
              <AdSpace position="bottom" className="max-w-3xl mx-auto" />
            </div>
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
