import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const fullDir = syncReadFile("../input.txt");

let currentDir = "";
let allDirs = {};

for (const lsResult of fullDir) {
  if (lsResult !== "") {
    const firstSegment = lsResult.split(" ")[0];
    const secondSegment = lsResult.split(" ")[1];
    if (firstSegment === "$") {
      if (secondSegment === "cd") {
        const thirdSegment = lsResult.split(" ")[2];
        if (thirdSegment !== "..") {
          let dirPath = "";
          if ((currentDir === "") | (currentDir === "/")) {
            dirPath = currentDir + thirdSegment;
          } else {
            dirPath = currentDir + "/" + thirdSegment;
          }
          console.log(`Moving into dir ${dirPath}`);
          allDirs[dirPath] = {
            parent: currentDir,
            dirSize: 0,
          };
          currentDir = dirPath;
        } else {
          const parentDir = allDirs[currentDir].parent;
          console.log(`Moving back to dir ${parentDir}`);
          allDirs[parentDir].dirSize += allDirs[currentDir].dirSize;
          currentDir = parentDir;
        }
      }
    } else if (firstSegment !== "dir") {
      const fileSize = Number(firstSegment);
      allDirs[currentDir].dirSize += fileSize;
    }
  }
}
console.log({ currentDir });
// console.log({ allDirs });

const diskSize = 70000000;
let currentDirSize = 70000000;
const spaceNeeded = 30000000 - (diskSize - allDirs["/"].dirSize);
console.log({ spaceNeeded });
for (const dirs in allDirs) {
  console.log(allDirs[dirs].dirSize);
  if (
    (allDirs[dirs].dirSize >= spaceNeeded) &
    (allDirs[dirs].dirSize < currentDirSize)
  ) {
    const tempDirSize = allDirs[dirs].dirSize;
    console.log(
      `found ${dirs} of size ${tempDirSize} is greater than ${spaceNeeded} and less than ${currentDirSize}`
    );
    currentDirSize = tempDirSize;
  }
}
console.log({ currentDirSize });
