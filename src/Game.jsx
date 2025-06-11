import { useState, useEffect } from "react";
import PauseMenu from "./components/game/PauseMenu";
import Instructions from "./components/game/Instructions";
import GameOver from "./components/game/GameOver";
import Victory from "./components/game/Victory";
import GameControls from "./components/game/GameControls";
import ScoreDisplay from "./components/game/ScoreDisplay";
import { useGameLogic } from "./hooks/useGameLogic";
import "./styles/animations.css";
import "./styles/game.css";
import React from "react";

// Memoized Grape Pattern Component
const GrapePattern = React.memo(({ eatenGrapes }) => (
  <div className="grape-pattern">
    {eatenGrapes.map((grape) => (
      <img
        key={grape.id}
        src="/sprites/grape.png"
        alt="eaten grape"
        className="grape-pattern-item animate-eat"
        style={{
          left: `${grape.x}%`,
          top: `${grape.y}px`,
          '--rotation': `${Math.random() * 360}deg`
        }}
      />
    ))}
  </div>
));

export default function Game() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  
  const {
    currentIndex,
    score,
    gameOver,
    grapeQuantity,
    setGrapeQuantity,
    eatenGrapes,
    remainingGrapes,
    resetGame,
    handleEat,
    handleSkip,
    TOTAL_GRAPES
  } = useGameLogic();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Trigger score animation when score changes
  useEffect(() => {
    setShowScoreAnimation(true);
    const timer = setTimeout(() => setShowScoreAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [score]);

  if (showInstructions) {
    return <Instructions onStart={() => setShowInstructions(false)} />;
  }

  if (gameOver) {
    return <GameOver score={score} onRestart={resetGame} />;
  }

  if (currentIndex >= TOTAL_GRAPES) {
    return <Victory score={score} onRestart={resetGame} />;
  }

  return (
    <div className="game-container animate-fade-in">
      {isPaused && (
        <PauseMenu
          onResume={() => setIsPaused(false)}
          onRestart={resetGame}
          onShowInstructions={() => {
            setIsPaused(false);
            setShowInstructions(true);
          }}
        />
      )}
      <GrapePattern eatenGrapes={eatenGrapes} />
      <div className="game-content animate-slide-up">
        <img 
          src="/sprites/grape.png" 
          alt="grape" 
          className="w-20 h-20 animate-button" 
        />
        <GameControls
          grapeQuantity={grapeQuantity}
          setGrapeQuantity={setGrapeQuantity}
          onEat={handleEat}
          onSkip={handleSkip}
          remainingGrapes={remainingGrapes}
        />
        <ScoreDisplay
          score={score}
          remainingGrapes={remainingGrapes}
          showAnimation={showScoreAnimation}
        />
      </div>
    </div>
  );
}
