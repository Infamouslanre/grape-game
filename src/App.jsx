import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Game from './Game';
import Auth from './components/auth/Auth';
import HighScores from './components/layout/HighScores';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return (
      <Auth 
        onClose={() => setUser(auth.currentUser)} 
        onGuestMode={handleGuestMode}
      />
    );
  }

  return (
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
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
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
    </div>
  );
}

export default App;
