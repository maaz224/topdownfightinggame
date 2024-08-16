import { Audio } from 'expo-av';

export const playSound = async (soundFile) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);
  await sound.playAsync();
  return sound;
};

export const stopSound = async (sound) => {
  if (sound) {
    await sound.stopAsync();
  }
};

export const loopSound = async (soundFile) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);
  await sound.setIsLoopingAsync(true);
  await sound.playAsync();
  return sound;
};
