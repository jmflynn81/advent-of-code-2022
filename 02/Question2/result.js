import { readFileSync } from "fs";

const materialValues = {
  A: { value: 1, win: "B", lose: "C", draw: "A" },
  B: { value: 2, win: "C", lose: "A", draw: "B" },
  C: { value: 3, win: "A", lose: "B", draw: "C" },
};

const winLoseDraw = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

let score = 0;
const rpsData = syncReadFile("../input.txt");
for (const game of rpsData) {
  if (game[0] !== undefined) {
    const opponentMaterial = game[0];
    const opponentValue = materialValues[opponentMaterial].value;
    const strategy = winLoseDraw[game[2]];
    const strategyLetter = materialValues[opponentMaterial][strategy];
    const me = materialValues[strategyLetter].value;
    const outcome = opponentValue - me;
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
}

console.log({ score });
