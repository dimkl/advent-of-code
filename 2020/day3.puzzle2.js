const { readFileSync } = require('fs');

const partialMapTxt = readFileSync('./map.snippet.txt', 'utf8');
const partialMap = partialMapTxt.split('\n');

const repeatMapAfter = partialMap[0].length;
const slopeStrategies = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

function traverseMap(strategy) {
  const currentPosition = { x: 0, y: 0 };
  const [slopeRight, slopeDown] = strategy;
  let encounteredTrees = 0;

  while (currentPosition.y < partialMap.length) {
    const mapIndication = partialMap[currentPosition.y][currentPosition.x % repeatMapAfter];

    const isTree = mapIndication == '#';
    if (isTree) encounteredTrees += 1;

    currentPosition.y += slopeDown;
    currentPosition.x += slopeRight;
  }

  console.log({ strategy, encounteredTrees });

  return encounteredTrees;
}

const encounteredTreesProduct = slopeStrategies.map(traverseMap).reduce((acc, n) => acc * n, 1);
console.log({ encounteredTreesProduct });