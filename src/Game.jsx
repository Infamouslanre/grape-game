import { useState, useEffect } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import PauseMenu from "./components/game/PauseMenu";
import Instructions from "./components/game/Instructions";
import GameOver from "./components/game/GameOver";
import Victory from "./components/game/Victory";
import GameControls from "./components/game/GameControls";
import ScoreDisplay from "./components/game/ScoreDisplay";

export default function Game() {
  const TOTAL_GRAPES = 1000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [poisonIndex, setPoisonIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [grapeQuantity, setGrapeQuantity] = useState(1);
  const [eatenGrapes, setEatenGrapes] = useState([]);
  const [customQuantity, setCustomQuantity] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  function resetGame() {
    setPoisonIndex(Math.floor(Math.random() * TOTAL_GRAPES));
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setGrapeQuantity(1);
    setEatenGrapes([]);
    setCustomQuantity("");
    setIsPaused(false);
    setScoreSaved(false);
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

  const saveScore = async (score) => {
    if (!auth.currentUser || scoreSaved) return;

    try {
      const displayName = auth.currentUser.displayName || auth.currentUser.email;
      const scoreData = {
        userId: auth.currentUser.uid,
        playerName: displayName,
        score: score,
        timestamp: new Date(),
        result: gameOver ? 'game_over' : 'victory'
      };

      console.log('Saving score:', scoreData);
      await addDoc(collection(db, 'scores'), scoreData);
      setScoreSaved(true);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  // Save score when game ends (either victory or game over)
  useEffect(() => {
    if ((gameOver || currentIndex >= TOTAL_GRAPES) && !scoreSaved) {
      console.log('Game ended, attempting to save score...');
      console.log('Game state:', {
        gameOver,
        currentIndex,
        score,
        scoreSaved
      });
      saveScore(score);
    }
  }, [gameOver, currentIndex, score, scoreSaved]);

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
    <div className="game-container">
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
        <GameControls
          grapeQuantity={grapeQuantity}
          setGrapeQuantity={setGrapeQuantity}
          customQuantity={customQuantity}
          setCustomQuantity={setCustomQuantity}
          onEat={handleEat}
          onSkip={handleSkip}
          remainingGrapes={TOTAL_GRAPES - currentIndex}
        />
        <ScoreDisplay
          score={score}
          remainingGrapes={TOTAL_GRAPES - currentIndex}
        />
      </div>
    </div>
  );
}
