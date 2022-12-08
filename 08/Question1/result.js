import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  arr.pop();
  return arr;
};

const allTreesRaw = syncReadFile("../input.txt");

console.log({ allTreesRaw });

let treeLRLoc = 0;
let treeUDLoc = 0;
const treeRightMax = allTreesRaw[0].length - 1;
console.log({ treeRightMax });
const treeDownMax = allTreesRaw.length - 1;
let treesCanSee = 0;
console.log({ treeDownMax });
for (const row of allTreesRaw) {
  if (row !== "") {
    for (const tree of row) {
      if (
        [0, treeDownMax].includes(treeUDLoc) ||
        [0, treeRightMax].includes(treeLRLoc)
      ) {
        console.log({ treeUDLoc }, { treeLRLoc }, { tree }, "On the edge");
        treesCanSee += 1;
      } else {
        let tmpTrees = allTreesRaw[treeUDLoc].slice(0, treeLRLoc);
        let higherThan = [...tmpTrees].filter((tmpTree) => tmpTree >= tree);
        if (higherThan.length === 0) {
          console.log({ treeUDLoc }, { treeLRLoc }, { tree }, "See from left");
          treesCanSee += 1;
        } else {
          tmpTrees = allTreesRaw[treeUDLoc].slice(
            treeLRLoc + 1,
            treeRightMax + 1
          );
          higherThan = [...tmpTrees].filter((tmpTree) => tmpTree >= tree);
          if (higherThan.length === 0) {
            console.log(
              { treeUDLoc },
              { treeLRLoc },
              { tree },
              "See from right"
            );
            treesCanSee += 1;
          } else {
            const tmpUDTrees = allTreesRaw.map((treeRow) => treeRow[treeLRLoc]);
            higherThan = tmpUDTrees
              .slice(0, treeUDLoc)
              .filter((tmpTree) => tmpTree >= tree);
            if (higherThan.length === 0) {
              console.log(
                { treeUDLoc },
                { treeLRLoc },
                { tree },
                "See from Top"
              );
              treesCanSee += 1;
            } else {
              higherThan = tmpUDTrees
                .slice(treeUDLoc + 1, treeDownMax + 1)
                .filter((tmpTree) => tmpTree >= tree);
              if (higherThan.length === 0) {
                console.log(
                  { treeUDLoc },
                  { treeLRLoc },
                  { tree },
                  "See from bottom"
                );
                treesCanSee += 1;
              } else {
                console.log(
                  { treeUDLoc },
                  { treeLRLoc },
                  { tree },
                  "Can't see it"
                );
              }
            }
          }
        }
      }
      treeLRLoc += 1;
    }
    treeLRLoc = 0;
    treeUDLoc += 1;
  }
}
console.log({ treesCanSee });
