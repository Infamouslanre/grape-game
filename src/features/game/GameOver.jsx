import React from 'react';

export default function GameOver({ score, onRestart }) {
  return (
    <div className="text-center p-4">
      <h1 className="text-red-500 text-3xl mb-4">💀 You ate a poisoned grape!</h1>
      <p className="text-xl mb-4">Final Score: {score}</p>
      <button onClick={onRestart} className="bg-purple-500 text-white p-2 rounded">
        Restart
      </button>
    </div>
  );
} 