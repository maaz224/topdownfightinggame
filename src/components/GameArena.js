import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Player from './Player';
import Enemy from './Enemy';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import { playSound } from '../utils/soundManager';
import attackSound from '../assets/sounds/attack.mp3';  // Ensure you have the correct path

const GameArena = ({ playerImage, enemyImage }) => {
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes = 300 seconds
  const [enemies, setEnemies] = useState([
    { id: 1, position: { x: 200, y: 200 }, isAlive: true },
    { id: 2, position: { x: 300, y: 300 }, isAlive: true },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      // Handle end of game logic here
    }
  }, [timeRemaining]);

  const handleKill = (enemyId) => {
    setScore((prev) => prev + 1);

    // Mark enemy as dead
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) =>
        enemy.id === enemyId ? { ...enemy, isAlive: false } : enemy
      )
    );

    // Respawn the enemy after 15 seconds at a random position
    setTimeout(() => {
      const randomPosition = {
        x: Math.random() * 300,
        y: Math.random() * 500,
      };

      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) =>
          enemy.id === enemyId ? { ...enemy, position: randomPosition, isAlive: true } : enemy
        )
      );
    }, 15000);
  };

  const handleAttack = async () => {
    // Play attack sound
    const sound = await playSound(attackSound);

    // Logic for player attack
    // You might integrate the player attack logic here to be triggered on button press
  };

  return (
    <View style={styles.arena}>
      <Player
        playerImage={playerImage}
        initialPosition={{ x: 100, y: 100 }}
        enemies={enemies}
        setEnemies={setEnemies}
        setScore={setScore}
      />

      {enemies.map((enemy) =>
        enemy.isAlive ? (
          <Enemy
            key={enemy.id}
            enemyImage={enemyImage}
            initialPosition={enemy.position}
            onKill={() => handleKill(enemy.id)}
          />
        ) : null
      )}

      <Controls onMove={() => {}} onAttack={handleAttack} />
      <ScoreBoard score={score} timeRemaining={timeRemaining} />
    </View>
  );
};

const styles = StyleSheet.create({
  arena: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameArena;
