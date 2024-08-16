import { Animated } from 'react-native';

export const createPanResponder = (position) => {
  return Animated.createAnimatedComponent({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      // Optionally, you can add logic here to handle what happens when the movement ends
    }
  });
};

export const resetPosition = (position, initialPosition) => {
  position.setValue(initialPosition);
};
