import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const tmpArr = contents.split(/\r?\n/);
  tmpArr.pop();
  let arr = [];
  for (const arrElement of tmpArr) {
    const tmpEle = arrElement.split(" ");
    arr.push([tmpEle[0], Number(tmpEle[1])]);
  }
  return arr;
};

const allDirections = syncReadFile("../input.txt");

const getMax = (acc, direction) => {
  acc[direction[0]] += direction[1];
  return acc;
};

const grid = [];
const maxs = allDirections.reduce(getMax, { R: 0, L: 0, U: 0, D: 0 });

for (let i = 0; i != maxs.U + maxs.D + 1; i++) {
  grid.push([]);
  for (let j = 0; j != maxs.L + maxs.R + 1; j++) {
    grid[i].push(0);
  }
}

let currentHeadPosition = [maxs.L, maxs.U];
let currentTailPosistion = [maxs.L, maxs.U];
grid[maxs.U][maxs.L] += 1;

const moveTail = () => {
  const xDiff = currentHeadPosition[0] - currentTailPosistion[0];
  const yDiff = currentHeadPosition[1] - currentTailPosistion[1];
  if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
    console.log("tail needs to move");
    if (xDiff > 0) {
      currentTailPosistion[0] += 1;
    } else if (xDiff < 0) {
      currentTailPosistion[0] -= 1;
    }
    if (yDiff > 0) {
      currentTailPosistion[1] += 1;
    } else if (yDiff < 0) {
      currentTailPosistion[1] -= 1;
    }
    grid[currentTailPosistion[1]][currentTailPosistion[0]] += 1;
  } else {
    console.log("leave tail alone");
  }
};

for (const direction of allDirections) {
  console.log({ direction });
  switch (direction[0]) {
    case "R":
      for (let i = 1; i != direction[1] + 1; i++) {
        currentHeadPosition[0] += 1;
        moveTail();
      }
      break;
    case "L":
      for (let i = 1; i != direction[1] + 1; i++) {
        currentHeadPosition[0] -= 1;
        moveTail();
      }
      break;
    case "D":
      for (let i = 1; i != direction[1] + 1; i++) {
        currentHeadPosition[1] += 1;
        moveTail();
      }
      break;
    case "U":
      for (let i = 1; i != direction[1] + 1; i++) {
        currentHeadPosition[1] -= 1;
        moveTail();
      }
      break;
    default:
      console.log("Umm, something went wrong");
      break;
  }
}

let countOfTail = 0;
for (const rows of grid) {
  for (const coloumn of rows) {
    if (coloumn > 0) {
      countOfTail += 1;
    }
  }
}

console.log(countOfTail);
