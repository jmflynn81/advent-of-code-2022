import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const pairArray = syncReadFile("../input.txt");
// console.log({ pairArray });

let pairs = 0;
for (const pair of pairArray) {
  if (pair != "") {
    const p1 = pair
      .split(",")[0]
      .split("-")
      .map((str) => {
        return parseInt(str);
      });
    const p2 = pair
      .split(",")[1]
      .split("-")
      .map((str) => {
        return parseInt(str);
      });
    console.log({ p1 }, { p2 });
    if (p1[0] < p2[0]) {
      if (p2[0] <= p1[1]) {
        pairs += 1;
        console.log("p2 extends p1");
      }
    } else if (p2[0] < p1[0]) {
      if (p1[0] <= p2[1]) {
        pairs += 1;
        console.log("p1 extends p2");
      }
    } else if (p2[0] === p1[0]) {
      pairs += 1;
      console.log("p1 start is equal to p2 start");
    }
  }
}
console.log({ pairs });
