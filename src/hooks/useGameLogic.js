import { useState, useEffect, useCallback, useMemo } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const useGameLogic = () => {
  const TOTAL_GRAPES = 1000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [poisonIndex, setPoisonIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [grapeQuantity, setGrapeQuantity] = useState(1);
  const [eatenGrapes, setEatenGrapes] = useState([]);
  const [scoreSaved, setScoreSaved] = useState(false);

  // Memoize the remaining grapes calculation
  const remainingGrapes = useMemo(() => TOTAL_GRAPES - currentIndex, [currentIndex]);

  const resetGame = useCallback(() => {
    setPoisonIndex(Math.floor(Math.random() * TOTAL_GRAPES));
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setGrapeQuantity(1);
    setEatenGrapes([]);
    setScoreSaved(false);
  }, []);

  const handleEat = useCallback(() => {
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
      setEatenGrapes(prev => [...prev, ...newEatenGrapes]);
      setScore(prev => prev + (10 * (endIndex - currentIndex)));
      setCurrentIndex(endIndex);
    }
  }, [currentIndex, grapeQuantity, poisonIndex]);

  const handleSkip = useCallback(() => {
    setCurrentIndex(prev => prev + grapeQuantity);
  }, [grapeQuantity]);

  const saveScore = useCallback(async (score) => {
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

      await addDoc(collection(db, 'scores'), scoreData);
      setScoreSaved(true);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  }, [gameOver, scoreSaved]);

  // Save score when game ends
  useEffect(() => {
    if ((gameOver || currentIndex >= TOTAL_GRAPES) && !scoreSaved) {
      saveScore(score);
    }
  }, [gameOver, currentIndex, score, scoreSaved, saveScore]);

  return {
    currentIndex,
    poisonIndex,
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
  };
}; 