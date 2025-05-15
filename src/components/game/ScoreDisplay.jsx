import React from 'react';

export default function ScoreDisplay({ score, remainingGrapes }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p>Score: {score}</p>
      <p>Grapes Left: {remainingGrapes}</p>
      <p className="text-sm text-gray-500 mt-2">Press ESC to pause</p>
    </div>
  );
} 