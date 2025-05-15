import React from 'react';

export default function Instructions({ onStart }) {
  return (
    <div className="game-container">
      <div className="game-content instructions">
        <h1 className="text-3xl mb-6 text-center">🍇 How to Play 🍇</h1>
        <div className="space-y-4 text-sm">
          <p>1. You have 1000 grapes to eat</p>
          <p>2. One grape is poisoned! 🚫</p>
          <p>3. Choose how many grapes to eat:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the preset buttons (5, 10, 100)</li>
            <li>Or type any custom number</li>
          </ul>
          <p>4. Click "Eat" to consume the grapes</p>
          <p>5. Click "Skip" to pass the grapes</p>
          <p>6. Each grape eaten = 10 points</p>
          <p>7. If you eat the poisoned grape, game over!</p>
          <p className="text-yellow-500 mt-4">Tip: The more grapes you eat at once, the higher your score, but be careful!</p>
          <p className="text-blue-500 mt-4">Press ESC to pause the game</p>
        </div>
        <button 
          onClick={onStart} 
          className="mt-8 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
} 