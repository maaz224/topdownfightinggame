import React, { useState } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import { createPanResponder } from "../utils/movement";
import { checkCollision } from "../utils/checkCollision";
import collisionData from "../utils/collisionData"; // Import collision data
import { checkMapCollision } from "../utils/checkCollision";

const updatePosition = (dx, dy) => {
  const newX = position.x._value + dx;
  const newY = position.y._value + dy;

  if (!checkMapCollision(newX, newY)) {
    position.setValue({ x: newX, y: newY });
  }
};

const SPRITE_SIZE = 64;
const SPRITE_SHEET_COLUMNS = 8;
const SPRITE_SHEET_ROWS = 4;

const Player = ({ initialPosition, enemies, setEnemies, setScore }) => {
  const [position, setPosition] = useState(
    new Animated.ValueXY(initialPosition)
  );
  const [isAttacking, setIsAttacking] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [direction, setDirection] = useState("down");

  // PanResponder for handling player movement
  const panResponder = createPanResponder(position, (newDirection) => {
    setDirection(newDirection);
  });

  // Calculate the correct frame for the current direction
  const getFramePosition = () => {
    let row;
    switch (direction) {
      case "up":
        row = 1;
        break;
      case "left":
        row = 2;
        break;
      case "right":
        row = 3;
        break;
      case "down":
      default:
        row = 0;
        break;
    }
    const x = (animationFrame % SPRITE_SHEET_COLUMNS) * SPRITE_SIZE;
    const y = row * SPRITE_SIZE;
    return { x, y };
  };

  // Update the animation frame periodically
  React.useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationFrame((prevFrame) => (prevFrame + 1) % SPRITE_SHEET_COLUMNS);
    }, 100); // Adjust speed of animation as needed

    return () => clearInterval(animationInterval);
  }, []);

  // Function to check if the player's new position would collide with any of the collision boxes
  const isColliding = (newX, newY) => {
    return collisionData.some((box) => {
      return (
        newX < box.x + box.width &&
        newX + SPRITE_SIZE > box.x &&
        newY < box.y + box.height &&
        newY + SPRITE_SIZE > box.y
      );
    });
  };

  // Attack function
  const handleAttack = () => {
    setIsAttacking(true);

    // Check for collision with enemies
    enemies.forEach((enemy, index) => {
      if (enemy.isAlive && checkCollision(position, enemy.position)) {
        // Handle enemy being hit
        const updatedEnemies = [...enemies];
        updatedEnemies[index].isAlive = false;
        setEnemies(updatedEnemies);

        // Increase the player's score
        setScore((prevScore) => prevScore + 1);
      }
    });

    setTimeout(() => {
      setIsAttacking(false);
    }, 500); // Attack animation duration
  };

  const framePosition = getFramePosition();

  // Update the position with collision checking
  const updatePosition = (dx, dy) => {
    const newX = position.x._value + dx;
    const newY = position.y._value + dy;

    if (!isColliding(newX, newY)) {
      position.setValue({ x: newX, y: newY });
    }
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[position.getLayout(), styles.player]}
    >
      <Image
        source={require("../assets/images/arena/map1.png")}
        style={[
          styles.image,
          {
            width: SPRITE_SHEET_COLUMNS * SPRITE_SIZE,
            height: SPRITE_SHEET_ROWS * SPRITE_SIZE,
            transform: [
              { translateX: -framePosition.x },
              { translateY: -framePosition.y },
            ],
          },
        ]}
        onTouchStart={handleAttack} // Trigger attack on touch
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
  },
  image: {
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
    overflow: "hidden", // Hide parts of the sprite sheet outside the current frame
  },
});

export default Player;
