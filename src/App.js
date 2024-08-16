import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import GameArena from "./components/GameArena";

const App = () => {
  const [screen, setScreen] = useState("menu"); // Possible values: 'menu', 'game', 'instructions'

  const handleStartGame = () => {
    setScreen("game");
  };

  const handleShowInstructions = () => {
    setScreen("instructions");
  };

  const handleBackToMenu = () => {
    setScreen("menu");
  };

  return (
    <View style={styles.container}>
      {screen === "menu" && (
        <View style={styles.menu}>
          <Text style={styles.title}>Top-Down Fighting Game</Text>
          <Button title="Start Game" onPress={handleStartGame} />
          <Button title="Instructions" onPress={handleShowInstructions} />
          <Button
            title="Exit"
            onPress={() => {
              /* Exit logic for native apps */
            }}
          />
        </View>
      )}

      {screen === "game" && (
        <GameArena
          playerImage={require("./assets/images/player/player_idle.png")}
          enemyImage={require("./assets/images/enemies/enemy1_idle.png")}
        />
      )}

      {screen === "instructions" && (
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>Instructions:</Text>
          <Text style={styles.instructionsText}>
            - Use the controls to move your player.
          </Text>
          <Text style={styles.instructionsText}>
            - Attack enemies to increase your score.
          </Text>
          <Text style={styles.instructionsText}>
            - Survive and score as high as possible within 5 minutes.
          </Text>
          <Button title="Back to Menu" onPress={handleBackToMenu} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  instructions: {
    justifyContent: "center",
    alignItems: "center",
  },
  instructionsText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default App;
