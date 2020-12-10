const { readFileSync } = require('fs');

const boardingPassesTxt = readFileSync('./boarding-passes.txt', 'utf8');
const boardingPasses = boardingPassesTxt.split('\n');

const convertToSeatID = (boardingPass) => {
  const row = boardingPass.slice(0, 7).replace(/B/g, '1').replace(/F/g, '0');
  const column = boardingPass.slice(7).replace(/R/g, '1').replace(/L/g, '0');

  return parseInt(row, 2) * 8 + parseInt(column, 2);
};

const highestSeatID = Math.max(...boardingPasses.map(convertToSeatID));

console.log({ highestSeatID });