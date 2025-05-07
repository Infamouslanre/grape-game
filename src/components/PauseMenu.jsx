import React from 'react';

export default function PauseMenu({ onResume, onRestart, onShowInstructions }) {
  return (
    <div className="pause-overlay">
      <div className="pause-menu">
        <h2 className="text-2xl mb-6 text-center">Game Paused</h2>
        <div className="flex flex-col gap-4">
          <button 
            onClick={onResume}
            className="pause-button bg-green-500 hover:bg-green-600"
          >
            Resume Game
          </button>
          <button 
            onClick={onRestart}
            className="pause-button bg-yellow-500 hover:bg-yellow-600"
          >
            Restart Game
          </button>
          <button 
            onClick={onShowInstructions}
            className="pause-button bg-blue-500 hover:bg-blue-600"
          >
            Show Instructions
          </button>
        </div>
      </div>
    </div>
  );
} 