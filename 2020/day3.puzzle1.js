const { readFileSync } = require('fs');

const partialMapTxt = readFileSync('./map.snippet.txt', 'utf8');
const partialMap = partialMapTxt.split('\n');

const currentPosition = { x: 0, y: 0 };
const slopeRight = 3, slopeDown = 1;
const repeatMapAfter = partialMap[0].length;
let encounteredTrees = 0;

while (currentPosition.y < partialMap.length) {
  const mapIndication = partialMap[currentPosition.y][currentPosition.x % repeatMapAfter];

  const isTree = mapIndication == '#';
  if (isTree) encounteredTrees += 1;

  currentPosition.y += slopeDown;
  currentPosition.x += slopeRight;
}

console.log({ encounteredTrees });