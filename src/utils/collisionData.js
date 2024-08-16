const collisionData = [
  // Red Trees (Upper part)
  { x: 0, y: 0, width: 640, height: 128 }, // Covering the upper row of red trees

  // Red Trees (Left and Right parts)
  { x: 0, y: 128, width: 128, height: 256 }, // Covering the left column of red trees
  { x: 512, y: 128, width: 128, height: 256 }, // Covering the right column of red trees

  // Cliffs
  { x: 0, y: 384, width: 640, height: 64 }, // Covering the cliffs at the bottom

  // House
  { x: 256, y: 192, width: 128, height: 128 }, // Covering the house in the middle
];

export default collisionData;
