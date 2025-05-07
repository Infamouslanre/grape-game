import React from 'react';

export default function Victory({ score, onRestart }) {
  return (
    <div className="text-center p-4">
      <h1 className="text-green-400 text-3xl mb-4">🎉 You ate all the grapes safely!</h1>
      <p className="text-xl mb-4">Final Score: {score}</p>
      <button onClick={onRestart} className="bg-purple-500 text-white p-2 rounded">
        Play Again
      </button>
    </div>
  );
} 