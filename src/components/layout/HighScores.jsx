import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function HighScores({ onClose }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        console.log('Fetching scores...');
        const scoresRef = collection(db, 'scores');
        const q = query(scoresRef, orderBy('score', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        
        console.log('Query snapshot:', querySnapshot);
        
        const scoresList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Score data:', data);
          return {
            id: doc.id,
            ...data
          };
        });
        
        console.log('Processed scores:', scoresList);
        setScores(scoresList);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="high-scores-overlay">
      <div className="high-scores-container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-600">Global High Scores</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            Error loading scores: {error}
          </div>
        ) : (
          <div className="space-y-4">
            {scores.length === 0 ? (
              <p className="text-center text-gray-500">No scores yet. Be the first to play!</p>
            ) : (
              <div className="space-y-2">
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <span className={`text-base sm:text-lg font-bold ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-amber-600' :
                        'text-gray-600'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className="font-medium text-sm sm:text-base">{score.playerName || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-0">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {score.gameResult === 'victory' ? '🏆' : '💀'}
                      </span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">{score.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 