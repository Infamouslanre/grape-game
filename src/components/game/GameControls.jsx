import React, { useCallback } from 'react';

const GameControls = React.memo(({
  grapeQuantity,
  setGrapeQuantity,
  customQuantity,
  setCustomQuantity,
  onEat,
  onSkip,
  remainingGrapes
}) => {
  const handleQuantityChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= remainingGrapes) {
      setGrapeQuantity(value);
    }
  }, [remainingGrapes, setGrapeQuantity]);

  const handleCustomQuantityChange = useCallback((e) => {
    setCustomQuantity(e.target.value);
  }, [setCustomQuantity]);

  const handleCustomQuantitySubmit = useCallback((e) => {
    e.preventDefault();
    const value = parseInt(customQuantity);
    if (!isNaN(value) && value > 0 && value <= remainingGrapes) {
      setGrapeQuantity(value);
      setCustomQuantity("");
    }
  }, [customQuantity, remainingGrapes, setGrapeQuantity, setCustomQuantity]);

  return (
    <div className="game-controls">
      <div className="quantity-controls">
        <button
          onClick={() => setGrapeQuantity(prev => Math.max(1, prev - 1))}
          disabled={grapeQuantity <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <input
          type="number"
          value={grapeQuantity}
          onChange={handleQuantityChange}
          min="1"
          max={remainingGrapes}
          className="quantity-input"
        />
        <button
          onClick={() => setGrapeQuantity(prev => Math.min(remainingGrapes, prev + 1))}
          disabled={grapeQuantity >= remainingGrapes}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      <form onSubmit={handleCustomQuantitySubmit} className="custom-quantity-form">
        <input
          type="number"
          value={customQuantity}
          onChange={handleCustomQuantityChange}
          placeholder="Custom quantity"
          min="1"
          max={remainingGrapes}
          className="custom-quantity-input"
        />
        <button type="submit" className="custom-quantity-btn">
          Set
        </button>
      </form>

      <div className="action-buttons">
        <button onClick={onEat} className="eat-btn">
          Eat {grapeQuantity} Grape{grapeQuantity > 1 ? 's' : ''}
        </button>
        <button onClick={onSkip} className="skip-btn">
          Skip {grapeQuantity} Grape{grapeQuantity > 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
});

GameControls.displayName = 'GameControls';

export default GameControls; 