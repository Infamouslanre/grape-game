import { useState, useEffect } from "react";

export default function Game() {
  const TOTAL_GRAPES = 1000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [poisonIndex, setPoisonIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [grapeQuantity, setGrapeQuantity] = useState(1);
  const [eatenGrapes, setEatenGrapes] = useState([]);
  const [customQuantity, setCustomQuantity] = useState("");

  useEffect(() => {
    resetGame();
  }, []);

  function resetGame() {
    setPoisonIndex(Math.floor(Math.random() * TOTAL_GRAPES));
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setGrapeQuantity(1);
    setEatenGrapes([]);
    setCustomQuantity("");
  }

  function handleCustomQuantityChange(e) {
    const value = e.target.value;
    setCustomQuantity(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setGrapeQuantity(numValue);
    }
  }

  function handleEat() {
    const endIndex = Math.min(currentIndex + grapeQuantity, TOTAL_GRAPES);
    const isPoisoned = poisonIndex >= currentIndex && poisonIndex < endIndex;
    
    if (isPoisoned) {
      setGameOver(true);
    } else {
      const newEatenGrapes = Array.from({ length: endIndex - currentIndex }, (_, i) => ({
        id: currentIndex + i,
        x: Math.random() * 100,
        y: Math.floor((currentIndex + i) / 10) * 100
      }));
      setEatenGrapes([...eatenGrapes, ...newEatenGrapes]);
      setScore(score + (10 * (endIndex - currentIndex)));
      setCurrentIndex(endIndex);
    }
  }

  function handleSkip() {
    setCurrentIndex(currentIndex + grapeQuantity);
  }

  if (gameOver) {
    return (
      <div className="text-center p-4">
        <h1 className="text-red-500 text-3xl mb-4">💀 You ate a poisoned grape!</h1>
        <p className="text-xl mb-4">Final Score: {score}</p>
        <button onClick={resetGame} className="bg-purple-500 text-white p-2 rounded">Restart</button>
      </div>
    );
  }

  if (currentIndex >= TOTAL_GRAPES) {
    return (
      <div className="text-center p-4">
        <h1 className="text-green-400 text-3xl mb-4">🎉 You ate all the grapes safely!</h1>
        <p className="text-xl mb-4">Final Score: {score}</p>
        <button onClick={resetGame} className="bg-purple-500 text-white p-2 rounded">Play Again</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="grape-pattern">
        {eatenGrapes.map((grape) => (
          <img
            key={grape.id}
            src="/sprites/grape.png"
            alt="eaten grape"
            className="grape-pattern-item"
            style={{
              left: `${grape.x}%`,
              top: `${grape.y}px`
            }}
          />
        ))}
      </div>
      <div className="game-content">
        <img src="/sprites/grape.png" alt="grape" className="w-20 h-20" />
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
                max={TOTAL_GRAPES - currentIndex}
                className="w-32 px-2 py-1 border rounded text-center"
              />
              <span className="text-sm text-gray-600">grapes</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleEat} 
              className="bg-green-500 p-2 rounded"
              disabled={grapeQuantity <= 0 || grapeQuantity > (TOTAL_GRAPES - currentIndex)}
            >
              🍽 Eat {grapeQuantity}
            </button>
            <button 
              onClick={handleSkip} 
              className="bg-yellow-500 p-2 rounded"
              disabled={grapeQuantity <= 0 || grapeQuantity > (TOTAL_GRAPES - currentIndex)}
            >
              🚫 Skip {grapeQuantity}
            </button>
          </div>
        </div>
        <p>Score: {score}</p>
        <p>Grapes Left: {TOTAL_GRAPES - currentIndex}</p>
      </div>
    </div>
  );
}
