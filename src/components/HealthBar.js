import React from 'react';
import { View, StyleSheet } from 'react-native';

const HealthBar = ({ health }) => {
  return (
    <View style={styles.healthBarContainer}>
      <View style={[styles.healthBar, { width: `${health}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  healthBarContainer: {
    width: 100,
    height: 10,
    backgroundColor: 'gray',
  },
  healthBar: {
    height: '100%',
    backgroundColor: 'red',
  },
});

export default HealthBar;
