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

let locationGrid = [];

const resetLocationGrid = () => {
  locationGrid = [];
  for (let i = 0; i != maxs.U + maxs.D + 1; i++) {
    locationGrid.push([]);
    for (let j = 0; j != maxs.L + maxs.R + 1; j++) {
      locationGrid[i].push(" ");
    }
  }
};

const numberOfKnots = 10;
const knots = [];
for (let i = 0; i != numberOfKnots; i++) {
  knots.push([maxs.L, maxs.U]);
}

const printGrid = () => {
  resetLocationGrid();
  for (let b = 0; b != knots.length; b++) {
    locationGrid[knots[b][1]][knots[b][0]] = b;
  }
  for (const row of locationGrid) {
    console.log(row.toString());
  }
};
grid[maxs.U][maxs.L] += 1;
const knotsLength = knots.length;
const moveTail = () => {
  for (let i = 0; i != knots.length - 1; i++) {
    const xDiff = knots[i][0] - knots[i + 1][0];
    const yDiff = knots[i][1] - knots[i + 1][1];
    if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
      if (xDiff > 0) {
        knots[i + 1][0] += 1;
      } else if (xDiff < 0) {
        knots[i + 1][0] -= 1;
      }
      if (yDiff > 0) {
        knots[i + 1][1] += 1;
      } else if (yDiff < 0) {
        knots[i + 1][1] -= 1;
      }
      if (i + 1 === knots.length - 1) {
        grid[knots[i + 1][1]][knots[i + 1][0]] += 1;
      }
    } else {
    }
  }
};

for (const direction of allDirections) {
  // console.log({ direction });
  // printGrid();
  switch (direction[0]) {
    case "R":
      for (let i = 1; i != direction[1] + 1; i++) {
        knots[0][0] += 1;
        moveTail();
      }
      break;
    case "L":
      for (let i = 1; i != direction[1] + 1; i++) {
        knots[0][0] -= 1;
        moveTail();
      }
      break;
    case "D":
      for (let i = 1; i != direction[1] + 1; i++) {
        knots[0][1] += 1;
        moveTail();
      }
      break;
    case "U":
      for (let i = 1; i != direction[1] + 1; i++) {
        knots[0][1] -= 1;
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
