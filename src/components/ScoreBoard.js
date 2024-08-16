import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreBoard = ({ score, timeRemaining }) => {
  return (
    <View style={styles.scoreBoard}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.timeText}>Time Left: {timeRemaining} s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBoard: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  scoreText: {
    color: 'white',
    fontSize: 18,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScoreBoard;
