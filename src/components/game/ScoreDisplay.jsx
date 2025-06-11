import React from 'react';

const ScoreDisplay = React.memo(({ score, remainingGrapes }) => {
  return (
    <div className="score-display">
      <div className="score">
        <span className="score-label">Score:</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="remaining">
        <span className="remaining-label">Remaining:</span>
        <span className="remaining-value">{remainingGrapes}</span>
      </div>
    </div>
  );
});

ScoreDisplay.displayName = 'ScoreDisplay';

export default ScoreDisplay; 