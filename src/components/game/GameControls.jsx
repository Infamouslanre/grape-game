import React, { useCallback, useState } from 'react';

const GameControls = React.memo(({
  grapeQuantity,
  setGrapeQuantity,
  onEat,
  onSkip,
  remainingGrapes
}) => {
  const [isDecreasing, setIsDecreasing] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [decreaseInterval, setDecreaseInterval] = useState(null);
  const [increaseInterval, setIncreaseInterval] = useState(null);

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

  const startDecreasing = useCallback(() => {
    setIsDecreasing(true);
    setGrapeQuantity(prev => Math.max(0, prev - 1));
    const interval = setInterval(() => {
      setGrapeQuantity(prev => Math.max(0, prev - 1));
    }, 150);
    setDecreaseInterval(interval);
  }, [setGrapeQuantity]);

  const startIncreasing = useCallback(() => {
    setIsIncreasing(true);
    setGrapeQuantity(prev => Math.min(remainingGrapes, prev + 1));
    const interval = setInterval(() => {
      setGrapeQuantity(prev => Math.min(remainingGrapes, prev + 1));
    }, 150);
    setIncreaseInterval(interval);
  }, [remainingGrapes, setGrapeQuantity]);

  const stopChanging = useCallback(() => {
    setIsDecreasing(false);
    setIsIncreasing(false);
    if (decreaseInterval) {
      clearInterval(decreaseInterval);
      setDecreaseInterval(null);
    }
    if (increaseInterval) {
      clearInterval(increaseInterval);
      setIncreaseInterval(null);
    }
  }, [decreaseInterval, increaseInterval]);

  return (
    <div className="game-controls animate-slide-up">
      <div className="quantity-controls">
        <button
          onTouchStart={startDecreasing}
          onTouchEnd={stopChanging}
          onMouseDown={startDecreasing}
          onMouseUp={stopChanging}
          onMouseLeave={stopChanging}
          disabled={grapeQuantity <= 0}
          className="quantity-btn animate-button"
          aria-label="Decrease quantity"
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
          aria-label="Grape quantity"
        />
        <button
          onTouchStart={startIncreasing}
          onTouchEnd={stopChanging}
          onMouseDown={startIncreasing}
          onMouseUp={stopChanging}
          onMouseLeave={stopChanging}
          disabled={grapeQuantity >= remainingGrapes}
          className="quantity-btn animate-button"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="action-buttons">
        <button 
          onClick={onEat} 
          className="action-btn eat-btn animate-button"
          disabled={grapeQuantity <= 0 || grapeQuantity > remainingGrapes}
          aria-label={`Eat ${grapeQuantity} grape${grapeQuantity !== 1 ? 's' : ''}`}
        >
          Eat {grapeQuantity} Grape{grapeQuantity !== 1 ? 's' : ''}
        </button>
        <button 
          onClick={onSkip} 
          className="action-btn skip-btn animate-button"
          disabled={grapeQuantity <= 0 || grapeQuantity > remainingGrapes}
          aria-label={`Skip ${grapeQuantity} grape${grapeQuantity !== 1 ? 's' : ''}`}
        >
          Skip {grapeQuantity} Grape{grapeQuantity !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
});

GameControls.displayName = 'GameControls';

export default GameControls; 