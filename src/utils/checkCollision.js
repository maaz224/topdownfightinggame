export const checkCollision = (playerPosition, enemyPosition) => {
  const playerX = playerPosition.x.__getValue();
  const playerY = playerPosition.y.__getValue();
  const enemyX = enemyPosition.x.__getValue();
  const enemyY = enemyPosition.y.__getValue();

  // Define the collision box size (assuming both player and enemy have the same size)
  const size = 50;

  return (
    playerX < enemyX + size &&
    playerX + size > enemyX &&
    playerY < enemyY + size &&
    playerY + size > enemyY
  );
};

export const checkMapCollision = (newX, newY) => {
  return collisionData.some((box) => {
    return (
      newX < box.x + box.width &&
      newX + SPRITE_SIZE > box.x &&
      newY < box.y + box.height &&
      newY + SPRITE_SIZE > box.y
    );
  });
};
