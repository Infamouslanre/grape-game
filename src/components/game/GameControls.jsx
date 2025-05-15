import React from 'react';

export default function GameControls({ 
  grapeQuantity, 
  setGrapeQuantity, 
  customQuantity, 
  setCustomQuantity, 
  onEat, 
  onSkip, 
  remainingGrapes 
}) {
  const handleCustomQuantityChange = (e) => {
    const value = e.target.value;
    setCustomQuantity(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setGrapeQuantity(numValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <button 
            onClick={() => setGrapeQuantity(5)} 
            className={`px-3 py-1 rounded ${grapeQuantity === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            5
          </button>
          <button 
            onClick={() => setGrapeQuantity(10)} 
            className={`px-3 py-1 rounded ${grapeQuantity === 10 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            10
          </button>
          <button 
            onClick={() => setGrapeQuantity(100)} 
            className={`px-3 py-1 rounded ${grapeQuantity === 100 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            100
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={customQuantity}
            onChange={handleCustomQuantityChange}
            placeholder="Custom amount"
            min="1"
            max={remainingGrapes}
            className="w-32 px-2 py-1 border rounded text-center"
          />
          <span className="text-sm text-gray-600">grapes</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onEat} 
          className="bg-green-500 p-2 rounded"
          disabled={grapeQuantity <= 0 || grapeQuantity > remainingGrapes}
        >
          🍽 Eat {grapeQuantity}
        </button>
        <button 
          onClick={onSkip} 
          className="bg-yellow-500 p-2 rounded"
          disabled={grapeQuantity <= 0 || grapeQuantity > remainingGrapes}
        >
          🚫 Skip {grapeQuantity}
        </button>
      </div>
    </div>
  );
} 