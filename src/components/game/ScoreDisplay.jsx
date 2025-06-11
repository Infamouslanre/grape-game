import React from 'react';

const ScoreDisplay = React.memo(({ score, remainingGrapes, showAnimation }) => {
  return (
    <div className="score-display">
      <div className="score">
        <span className="score-label">Score:</span>
        <span className={`score-value ${showAnimation ? 'animate-score' : ''}`}>
          {score}
        </span>
      </div>
      <div className="remaining">
        <span className="remaining-label">Remaining:</span>
        <span className="remaining-value">{remainingGrapes}</span>
      </div>
      <p className="text-sm text-gray-500 mt-2 animate-fade-in">
        Press ESC to pause
      </p>
    </div>
  );
});

ScoreDisplay.displayName = 'ScoreDisplay';

export default ScoreDisplay; 