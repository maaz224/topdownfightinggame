import React, { useState, useEffect } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

const Enemy = ({ enemyImage, initialPosition, onKill }) => {
  const [position, setPosition] = useState(
    new Animated.ValueXY(initialPosition)
  );
  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    const moveEnemy = () => {
      Animated.sequence([
        Animated.timing(position, {
          toValue: { x: Math.random() * 300, y: Math.random() * 500 },
          duration: 2000,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const movementInterval = setInterval(moveEnemy, 3000);

    return () => clearInterval(movementInterval);
  }, []);

  // Logic to handle when this enemy is killed
  const handleDeath = () => {
    // Trigger the onKill function passed from the parent
    onKill();
  };

  return (
    <Animated.View style={[position.getLayout(), styles.enemy]}>
      <Image
        source={enemyImage}
        style={styles.image}
        onTouchStart={handleDeath} // Assume touching the enemy is how it gets killed for simplicity
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  enemy: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Enemy;
