import React, { useCallback } from 'react';

const GameControls = React.memo(({
  grapeQuantity,
  setGrapeQuantity,
  onEat,
  onSkip,
  remainingGrapes
}) => {
  const handleQuantityChange = useCallback((e) => {
    const value = e.target.value;
    // Allow empty input
    if (value === '') {
      setGrapeQuantity(0);
      return;
    }
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= remainingGrapes) {
      setGrapeQuantity(numValue);
    }
  }, [remainingGrapes, setGrapeQuantity]);

  return (
    <div className="game-controls animate-slide-up">
      <div className="quantity-controls">
        <button
          onClick={() => setGrapeQuantity(prev => Math.max(0, prev - 1))}
          disabled={grapeQuantity <= 0}
          className="quantity-btn animate-button"
        >
          -
        </button>
        <input
          type="number"
          value={grapeQuantity}
          onChange={handleQuantityChange}
          min="0"
          max={remainingGrapes}
          className="quantity-input"
        />
        <button
          onClick={() => setGrapeQuantity(prev => Math.min(remainingGrapes, prev + 1))}
          disabled={grapeQuantity >= remainingGrapes}
          className="quantity-btn animate-button"
        >
          +
        </button>
      </div>

      <div className="action-buttons">
        <button 
          onClick={onEat} 
          className="eat-btn animate-button"
          disabled={grapeQuantity <= 0 || grapeQuantity > remainingGrapes}
        >
          Eat {grapeQuantity} Grape{grapeQuantity !== 1 ? 's' : ''}
        </button>
        <button 
          onClick={onSkip} 
          className="skip-btn animate-button"
          disabled={grapeQuantity <= 0 || grapeQuantity > remainingGrapes}
        >
          Skip {grapeQuantity} Grape{grapeQuantity !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
});

GameControls.displayName = 'GameControls';

export default GameControls; 