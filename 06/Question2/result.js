import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  return contents.split("\n")[0];
};

const transmission = syncReadFile("../input.txt");

const starterMarker = 14;
let found = false;
let posistion = 0;

for (let i = starterMarker; found !== true; i++) {
  const tranSetSize = new Set([...transmission.slice(i - starterMarker, i)])
    .size;
  if (tranSetSize == starterMarker) {
    posistion = i;
    found = true;
  }
}

console.log({ posistion });
