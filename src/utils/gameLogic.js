import { checkCollision } from './collisionDetection';

export const handlePlayerAttack = (playerPosition, enemies, setEnemies, setScore) => {
  enemies.forEach((enemy, index) => {
    if (enemy.isAlive) {
      const isCollision = checkCollision(playerPosition, enemy.position);
      if (isCollision) {
        // Mark the enemy as dead
        const updatedEnemies = [...enemies];
        updatedEnemies[index].isAlive = false;
        setEnemies(updatedEnemies);

        // Increase the player's score
        setScore((prevScore) => prevScore + 1);

        // You can trigger a sound or animation here for the kill
      }
    }
  });
};

export const handleRespawn = (enemy, setEnemies) => {
  // Respawn the enemy at a random position
  const randomPosition = {
    x: Math.random() * 300,
    y: Math.random() * 500,
  };

  const updatedEnemies = [...enemy];
  updatedEnemies.isAlive = true;
  updatedEnemies.position = randomPosition;
  setEnemies(updatedEnemies);
};
