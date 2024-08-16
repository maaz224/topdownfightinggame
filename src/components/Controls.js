import React from "react";
import { View, Button, StyleSheet } from "react-native";

const Controls = ({ onMove, onAttack }) => {
  return (
    <View style={styles.controlsContainer}>
      <Button title="Move" onPress={onMove} />
      <Button title="Attack" onPress={onAttack} />
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});

export default Controls;
