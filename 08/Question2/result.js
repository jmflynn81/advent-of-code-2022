import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  arr.pop();
  return arr;
};

const allTreesRaw = syncReadFile("../input.txt");

let treeLRLoc = 0;
let treeUDLoc = 0;
const treeRightMax = allTreesRaw[0].length - 1;
const treeDownMax = allTreesRaw.length - 1;

let maxView = 0;

for (const row of allTreesRaw) {
  // console.log({ row });
  for (const tree of row) {
    // console.log({ tree });
    if (
      [0, treeDownMax].includes(treeUDLoc) ||
      [0, treeRightMax].includes(treeLRLoc)
    ) {
      // console.log("View = 0");
    } else {
      let treeLeftView = 0;
      let treeRightView = 0;
      let treeUpView = 0;
      let treeDownView = 0;
      let treesUp = allTreesRaw
        .map((treeRow) => treeRow[treeLRLoc])
        .slice(0, treeUDLoc);
      let treesDown = allTreesRaw
        .map((treeRow) => treeRow[treeLRLoc])
        .slice(treeUDLoc + 1, treeDownMax + 1);
      let viewCount = 0;

      for (let i = treeLRLoc - 1; i !== -1; i--) {
        const treeEval = row[i];
        viewCount += 1;
        if (treeEval >= tree) {
          treeLeftView = viewCount;
          viewCount = 0;
          break;
        }
      }
      if (treeLeftView === 0) {
        treeLeftView = viewCount;
        viewCount = 0;
      }

      for (let i = treeLRLoc + 1; i !== treeRightMax + 1; i++) {
        const treeEval = row[i];
        viewCount += 1;
        if (treeEval >= tree) {
          treeRightView = viewCount;
          viewCount = 0;
          break;
        }
      }
      if (treeRightView === 0) {
        treeRightView = viewCount;
        viewCount = 0;
      }

      for (let i = treeUDLoc - 1; i !== -1; i--) {
        const treeEval = treesUp[i];
        viewCount += 1;
        if (treeEval >= tree) {
          treeUpView = viewCount;
          viewCount = 0;
          break;
        }
      }
      if (treeUpView === 0) {
        treeUpView = viewCount;
        viewCount = 0;
      }

      for (let i = 0; i !== treeDownMax - treeUDLoc; i++) {
        const treeEval = treesDown[i];
        viewCount += 1;
        if (treeEval >= tree) {
          treeDownView = viewCount;
          viewCount = 0;
          break;
        }
      }
      if (treeDownView === 0) {
        treeDownView = viewCount;
        viewCount = 0;
      }

      const tmpMaxView =
        treeLeftView * treeRightView * treeUpView * treeDownView;
      if (tmpMaxView > maxView) {
        maxView = tmpMaxView;
      }
    }
    treeLRLoc += 1;
  }
  treeLRLoc = 0;
  treeUDLoc += 1;
}

console.log({ maxView });
