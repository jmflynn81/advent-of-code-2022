import { readFileSync } from "fs";

const materialValues = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
};

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

let score = 0;
const rpsData = syncReadFile("../input.txt");
for (const game of rpsData) {
  const opponent = materialValues[game[0]];
  const me = materialValues[game[2]];
  const outcome = opponent - me;
  switch (outcome) {
    case 0:
      score += me + 3;
      break;
    case 2:
      score += me + 6;
      break;
    case -1:
      score += me + 6;
      break;
    case -2:
      score += me;
      break;
    case 1:
      score += me;
      break;
    default:
      score += 0;
  }
}

console.log({ score });
